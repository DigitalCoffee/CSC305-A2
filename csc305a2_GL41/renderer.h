#pragma once

#include "shaderset.h"

struct SDL_Window;
class Scene;

class Renderer
{
    Scene* mScene;

    // ShaderSet explanation:
    // https://nlguillemot.wordpress.com/2016/07/28/glsl-shader-live-reloading/
    ShaderSet mShaders;

    GLuint* mSceneSP;
	GLuint* mShadowSP;

    int mBackbufferWidth;
    int mBackbufferHeight;
    GLuint mBackbufferFBO;
    GLuint mBackbufferColorTO;
    GLuint mBackbufferDepthTO;

	GLuint mShadowFBO;
	GLuint mShadowDepthTO;
	GLfloat mShadowSlopeScaleBias;
	GLfloat mShadowDepthBias;
	const int kShadowMapResolution = (1<<9);

	// Debug vars
	GLuint * mDepthVisSP;
	GLuint mNullVAO;
	bool mShowDepthVis;

public:
    void Init(Scene* scene);
    void Resize(int width, int height);
    void Render();

    void* operator new(size_t sz);
};
