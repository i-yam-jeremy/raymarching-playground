precision highp float;

varying vec2 uv;
uniform vec2 u_Resolution;
uniform float u_Time;
uniform float u_CameraDistance;
uniform vec2 u_CameraRotation;
uniform float u_MaxRenderDistance;

vec3 rotate(vec3 p, vec3 r) {
  mat3 xAxis = mat3(
    1,         0,        0,
    0,  cos(r.x), sin(r.x),
    0, -sin(r.x), cos(r.x)
  );
  mat3 yAxis = mat3(
    cos(r.y),  0, -sin(r.y),
           0,  1,         0,
    sin(r.y),  0,  cos(r.y)
  );
  mat3 zAxis = mat3(
     cos(r.z), sin(r.z), 0,
    -sin(r.z), cos(r.z), 0,
            0,        0, 1
  );
  return p*xAxis*yAxis*zAxis;
}

$$SDF_NODE_FUNCTIONS$$

$$SHADER_NODE_FUNCTIONS$$

float scene_sdf(vec3 p) {
  $$SDF_MAIN_FUNCTION_BODY$$
}

vec3 scene_normal(vec3 p) {
  float h = 0.001;
  float d = scene_sdf(p);
  return normalize(vec3(
    (scene_sdf(p + vec3(h, 0, 0)) - d) / h,
    (scene_sdf(p + vec3(0, h, 0)) - d) / h,
    (scene_sdf(p + vec3(0, 0, h)) - d) / h
  ));
}

float sdBox( vec3 p, vec3 b )
{
  vec3 d = abs(p) - b;
  return length(max(d,0.0))
         + min(max(d.x,max(d.y,d.z)),0.0); // remove this line for an only partially signed sdf
}

vec2 sdf(vec3 p) {
  float scene_d = scene_sdf(p);

  vec3 c = vec3(1, 1, 0);
  p = mod(p,c)-0.5*c;
  float plane_d = sdBox(p, vec3(1.0, 1.0, 0.001));

  if (scene_d < plane_d) {
    return vec2(scene_d, 0);
  }
  else {
    return vec2(plane_d, 1);
  }
}

vec3 shade(vec3 p, vec3 lightDir, vec3 normal, vec3 rayDir) {
  $$SHADER_MAIN_FUNCTION_BODY$$
}

vec3 march(vec3 p, vec3 ray) {
  float epsilon = 0.001;
  float t = 0.0;

  int missedGridLine = 0;
  for (int i = 0; i < 64; i++) {
    if (t > u_MaxRenderDistance) {
      break;
    }

    float d;
    int modelId;
    if (missedGridLine == 0) {
      vec2 d_data = sdf(p);
      d = d_data.x;
      modelId = int(d_data.y);
    }
    else {
      d = scene_sdf(p);
      modelId = 0;
    }
    if (d < epsilon) {
      if (modelId == 0) {
        vec3 lightDir = normalize(vec3(1, 1, -1));
        vec3 normal = scene_normal(p);
        return shade(p, lightDir, normal, ray);
      }
      else {
        float gridSize = 1.0;
        float modX = mod(p.x, gridSize) / gridSize;
        float modY = mod(p.y, gridSize) / gridSize;
        float lineWidth = 1.0/(30.0+length(p));
        if (max(modX, modY) > (1.0-lineWidth)) {
          return vec3(0.4*(1.0/(1.0+0.05*length(p))));
        }
        else {
          missedGridLine = 1;
        }
      }
    }
    t += d;
    p += ray*d;
  }

  return vec3(0, 0, 0);
}

void main() {
  vec2 my_uv = uv - vec2(0.5, 0.5);
  my_uv.x *= (u_Resolution.x/u_Resolution.y);
  vec3 camera = vec3(0, 0, -2.0 - u_CameraDistance);
  vec3 p = vec3(my_uv, -u_CameraDistance);
  vec3 rotation = vec3(-u_CameraRotation.y, 0, -u_CameraRotation.x);
  p = rotate(p, rotation);
  camera = rotate(camera, rotation);
  vec3 ray = normalize(p - camera);
  vec3 c = march(camera, ray);
  c = pow(max(c, vec3(0)), vec3(0.4545)); // gamma correction
  gl_FragColor = vec4(c, 1.0);
}
