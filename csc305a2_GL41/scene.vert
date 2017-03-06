layout(location = SCENE_POSITION_ATTRIB_LOCATION)
in vec4 Position;

layout(location = SCENE_TEXCOORD_ATTRIB_LOCATION)
in vec2 TexCoord;

layout(location = SCENE_NORMAL_ATTRIB_LOCATION)
in vec3 Normal;

uniform mat4 ModelWorld;
uniform mat4 ModelViewProjection;
uniform mat3 Normal_ModelWorld;

uniform mat4 lightMatrix;

in vec4 vertex_color;
out vec4 fragment_color;

out vec3 normal;
out vec3 vertPos;
out vec2 fragment_texcoord;

out vec4 shadowMapCoord;

void main()
{
    // TODO: Set to MVP * P
    gl_Position = ModelViewProjection * Position;
    
    // TODO: Pass vertex attributes to fragment shader
	//fragment_color = vertex_color;
    vertPos = vec3(ModelWorld * Position);
	normal = normalize(Normal_ModelWorld * Normal);
	fragment_texcoord = TexCoord;

	shadowMapCoord = (lightMatrix * Position);
}