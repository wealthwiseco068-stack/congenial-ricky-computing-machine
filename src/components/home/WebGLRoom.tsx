import { useEffect, useRef } from 'react';

export function WebGLRoom() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl');

    // Fallback: if WebGL not available, show static gradient
    if (!gl) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);

    const vertSrc = `attribute vec2 a_pos; void main(){ gl_Position = vec4(a_pos,0,1); }`;
    const fragSrc = `precision mediump float;
      uniform float u_time;
      uniform vec2 u_res;
      void main(){
        vec2 uv = gl_FragCoord.xy / u_res;
        float wave = sin(uv.x * 6.0 + u_time * 0.5) * 0.03;
        float grad = uv.y + wave;
        vec3 dark = vec3(0.04, 0.04, 0.04);
        vec3 mid  = vec3(0.10, 0.08, 0.06);
        vec3 col = mix(dark, mid, grad);
        gl_FragColor = vec4(col, 1.0);
      }`;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src); gl.compileShader(s); return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vertSrc));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fragSrc));
    gl.linkProgram(prog); gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_res');
    gl.uniform2f(uRes, canvas.width, canvas.height);

    let raf: number;
    const render = (t: number) => {
      gl.uniform1f(uTime, t * 0.001);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="py-24 bg-background" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-12 text-center">
          <span className="text-primary tracking-widest uppercase text-sm font-medium mb-4 block">Visualise Your Space</span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">Every room, reimagined.</h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-sm">We help you see the transformation before a single wall is touched.</p>
        </div>
        <div className="relative w-full h-64 md:h-96 rounded-md overflow-hidden border border-border/20">
          <canvas ref={canvasRef} className="w-full h-full" style={{ display: 'block' }} />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p className="font-serif text-2xl md:text-4xl text-foreground/80">Your vision, our craft.</p>
              <p className="text-muted-foreground text-sm mt-2 uppercase tracking-widest">3D Consultation Available</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
