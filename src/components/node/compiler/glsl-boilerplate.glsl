precision highp float;

varying vec2 uv;

$$NODE_FUNCTIONS$$

float scene_sdf(vec3 p) {
  $$MODEL_SDF_FUNCTION_BODY$$
}

vec3 march(vec3 p, vec3 ray) {
  float epsilon = 0.01;

  for (int i = 0; i < 64; i++) {
    float d = scene_sdf(p);
    if (d < epsilon) {
      return vec3(1, 0, 1);
    }
    p += ray*d;
  }

  return vec3(0, 0, 1);
}

void main() {
  vec3 camera = vec3(0, 0, -2);
  vec3 p = vec3(uv, 0);
  vec3 ray = normalize(p - camera);
  vec3 c = march(camera, ray);

  gl_FragColor = vec4(c, 1.0);
}
