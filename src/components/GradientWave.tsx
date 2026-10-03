import { useEffect, useRef } from "react";

/** Cinta de gradiente animada (WebGL) usada como firma visual del hero. */

export type WaveOptions = {
  incline?: number;
  offsetTop?: number;
  offsetBottom?: number;
  edgeDamp?: number;
  thickness?: number;
  noiseFreq?: [number, number];
  noiseAmp?: number;
  noiseSpeed?: number;
  noiseFlow?: number;
  fiber?: { freq?: number; bend?: number; strength?: number };
};

// Simplex noise 3D — Ashima Arts / Stefan Gustavson (licencia MIT).
const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const MAX_LAYERS = 4;

const VERTEX = /* glsl */ `
precision highp float;
attribute vec3 position;
attribute vec2 uv;
attribute vec2 uvNorm;
uniform vec2 resolution;
uniform float u_time;
uniform float u_incline, u_offsetTop, u_offsetBottom, u_edgeDamp, u_thickness;
uniform vec2 u_noiseFreq;
uniform float u_noiseAmp, u_noiseSpeed, u_noiseFlow, u_fiberFreq, u_fiberBend;
uniform vec3 u_baseColor;
uniform vec3 u_layerColor[${MAX_LAYERS}];
uniform int u_layerCount;
varying vec3 v_color;
varying float v_fiber;
${NOISE}
void main(){
  float time = u_time * 5e-6;
  vec2 noiseCoord = resolution * uvNorm * vec2(14e-5, 29e-5);
  float tilt = resolution.y / 2.0 * uvNorm.y;
  float incline = resolution.x * uvNorm.x / 2.0 * u_incline;
  float offset = resolution.x / 2.0 * u_incline * mix(u_offsetBottom, u_offsetTop, uv.y);
  float noise = snoise(vec3(
    noiseCoord.x * u_noiseFreq.x + time * u_noiseFlow,
    noiseCoord.y * u_noiseFreq.y,
    time * u_noiseSpeed + 5.0)) * u_noiseAmp;
  noise *= 1.0 - u_edgeDamp * pow(abs(uvNorm.y), 2.0);
  noise = max(0.0, noise);
  v_fiber = (uv.x - 0.85 * uv.y) * u_fiberFreq + (noise / max(u_noiseAmp, 1.0)) * u_fiberBend;
  vec3 pos = vec3(position.x, (position.y + tilt) * u_thickness + incline + noise - offset, 0.0);
  v_color = u_baseColor;
  for (int i = 0; i < ${MAX_LAYERS}; i++) {
    if (i >= u_layerCount) break;
    float fi = float(i + 1);
    float total = float(u_layerCount + 1);
    float n = snoise(vec3(
      noiseCoord.x * (2.0 + fi / total) + time * (6.5 + 0.3 * fi),
      noiseCoord.y * (3.0 + fi / total),
      time * (11.0 + 0.3 * fi) + 5.0 + 10.0 * fi)) / 2.0 + 0.5;
    float layer = smoothstep(0.1, 0.63 + 0.07 * fi, n);
    v_color = mix(v_color, u_layerColor[i], pow(layer, 4.0));
  }
  gl_Position = vec4(pos.x * 2.0 / resolution.x, pos.y * 2.0 / resolution.y, 0.0, 1.0);
}`;

const FRAGMENT = /* glsl */ `
precision highp float;
uniform float u_fiberStrength;
varying vec3 v_color;
varying float v_fiber;
void main(){
  vec3 color = v_color;
  if (u_fiberStrength > 0.0) {
    float f = 0.5 + 0.5 * sin(v_fiber * 6.28318);
    color *= 1.0 - u_fiberStrength * 0.5 * (0.55 - pow(f, 3.0));
  }
  gl_FragColor = vec4(color, 1.0);
}`;

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace("#", ""), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) ?? "shader error");
  }
  return shader;
}

class Wave {
  private gl: WebGLRenderingContext;
  private program: WebGLProgram;
  private buffers: Record<"position" | "uv" | "uvNorm" | "index", WebGLBuffer>;
  private indexCount = 0;
  private time = 1253106;
  private last = 0;
  private raf = 0;
  playing = false;

  constructor(
    private canvas: HTMLCanvasElement,
    private container: HTMLElement,
    colors: string[],
    o: WaveOptions,
  ) {
    const gl = canvas.getContext("webgl", { antialias: true });
    if (!gl) throw new Error("WebGL no soportado");
    this.gl = gl;
    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) ?? "link error");
    }
    gl.useProgram(program);
    this.program = program;
    this.buffers = {
      position: gl.createBuffer()!,
      uv: gl.createBuffer()!,
      uvNorm: gl.createBuffer()!,
      index: gl.createBuffer()!,
    };

    const rgb = colors.map(hexToRgb);
    const u = (name: string) => gl.getUniformLocation(program, name);
    gl.uniform1f(u("u_incline"), o.incline ?? 0);
    gl.uniform1f(u("u_offsetTop"), o.offsetTop ?? -0.5);
    gl.uniform1f(u("u_offsetBottom"), o.offsetBottom ?? -0.5);
    gl.uniform1f(u("u_edgeDamp"), o.edgeDamp ?? 1);
    gl.uniform1f(u("u_thickness"), o.thickness ?? 1);
    gl.uniform2fv(u("u_noiseFreq"), o.noiseFreq ?? [3, 4]);
    gl.uniform1f(u("u_noiseAmp"), o.noiseAmp ?? 320);
    gl.uniform1f(u("u_noiseSpeed"), o.noiseSpeed ?? 10);
    gl.uniform1f(u("u_noiseFlow"), o.noiseFlow ?? 3);
    gl.uniform1f(u("u_fiberFreq"), o.fiber?.freq ?? 90);
    gl.uniform1f(u("u_fiberBend"), o.fiber?.bend ?? 5);
    gl.uniform1f(u("u_fiberStrength"), o.fiber?.strength ?? 0);
    gl.uniform3fv(u("u_baseColor"), rgb[0]);
    const layers = rgb.slice(1, MAX_LAYERS + 1);
    gl.uniform1i(u("u_layerCount"), layers.length);
    layers.forEach((c, i) => gl.uniform3fv(u(`u_layerColor[${i}]`), c));
    this.resize();
  }

  resize() {
    const { gl } = this;
    const rect = this.container.getBoundingClientRect();
    const w = Math.max(1, Math.round(rect.width));
    const h = Math.max(1, Math.round(rect.height));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.round(w * dpr);
    this.canvas.height = Math.round(h * dpr);
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    gl.uniform2fv(gl.getUniformLocation(this.program, "resolution"), [w, h]);

    // Malla subdividida para que el ruido deforme la cinta con suavidad.
    const xs = Math.ceil(w * 0.06);
    const ys = Math.ceil(h * 0.16);
    const count = (xs + 1) * (ys + 1);
    const position = new Float32Array(count * 3);
    const uv = new Float32Array(count * 2);
    const uvNorm = new Float32Array(count * 2);
    const index = new Uint16Array(xs * ys * 6);
    for (let y = 0; y <= ys; y++) {
      for (let x = 0; x <= xs; x++) {
        const v = y * (xs + 1) + x;
        position[v * 3] = -w / 2 + (x * w) / xs;
        position[v * 3 + 1] = -(-h / 2 + (y * h) / ys);
        uv[v * 2] = x / xs;
        uv[v * 2 + 1] = 1 - y / ys;
        uvNorm[v * 2] = (x / xs) * 2 - 1;
        uvNorm[v * 2 + 1] = 1 - (y / ys) * 2;
        if (x < xs && y < ys) {
          const q = (y * xs + x) * 6;
          index[q] = v;
          index[q + 1] = v + 1 + xs;
          index[q + 2] = v + 1;
          index[q + 3] = v + 1;
          index[q + 4] = v + 1 + xs;
          index[q + 5] = v + 2 + xs;
        }
      }
    }
    this.indexCount = index.length;
    const bind = (name: "position" | "uv" | "uvNorm", data: Float32Array, size: number) => {
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers[name]);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(this.program, name);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
    };
    bind("position", position, 3);
    bind("uv", uv, 2);
    bind("uvNorm", uvNorm, 2);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.index);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, index, gl.STATIC_DRAW);
  }

  frame() {
    const { gl } = this;
    gl.uniform1f(gl.getUniformLocation(this.program, "u_time"), this.time);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES, this.indexCount, gl.UNSIGNED_SHORT, 0);
  }

  private tick = (now: number) => {
    if (!this.playing) return;
    if (this.last) this.time += Math.min(now - this.last, 1000 / 15);
    this.last = now;
    this.frame();
    this.raf = requestAnimationFrame(this.tick);
  };

  start() {
    if (this.playing) return;
    this.playing = true;
    this.last = 0;
    this.raf = requestAnimationFrame(this.tick);
  }

  stop() {
    this.playing = false;
    cancelAnimationFrame(this.raf);
  }
}

type Props = { colors: string[]; options: WaveOptions; className?: string };

export default function GradientWave({ colors, options, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block;";
    host.appendChild(canvas);

    let wave: Wave;
    try {
      wave = new Wave(canvas, host, colors, options);
    } catch (err) {
      console.error("GradientWave:", err);
      host.removeChild(canvas);
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    const sync = () => {
      if (visible && !document.hidden && !reduced.matches) wave.start();
      else {
        wave.stop();
        wave.frame();
      }
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    io.observe(host);
    const ro = new ResizeObserver(() => {
      wave.resize();
      wave.frame();
    });
    ro.observe(host);
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    sync();

    return () => {
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
      wave.stop();
      if (host.contains(canvas)) host.removeChild(canvas);
    };
  }, [colors, options]);

  return <div ref={ref} aria-hidden="true" className={`absolute inset-0 overflow-hidden ${className}`} />;
}
