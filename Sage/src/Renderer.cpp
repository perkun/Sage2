#include "Renderer.h"

#include <glad/glad.h>

namespace Sage {

Renderer::Renderer() {}

Renderer::~Renderer() {}

void Renderer::clear(glm::vec4 color)
{
    glClearColor(color.r, color.g, color.b, color.a);
    clear();
}

void Renderer::clear()
{
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
}

void Renderer::setViewport(int x, int y, int width, int height)
{
    glViewport(x, y, width, height);
}

void Renderer::bindDefaultFramebuffer()
{
    glBindFramebuffer(GL_FRAMEBUFFER, 0);
}

void Renderer::beginScene() {}

void Renderer::endScene() {}

void Renderer::submit() {}

}  // namespace Sage