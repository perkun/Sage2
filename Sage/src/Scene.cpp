#include "Scene.h"
#include "Camera.h"
#include "Entity.h"
#include "Components.h"
#include "Renderer.h"

namespace Sage {

Scene::Scene(Renderer &renderer) : _renderer(renderer) {}

Entity Scene::createEntity()
{
    return {_registry.create(), &_registry};
}

void Scene::draw()
{
    // _renderer.beginScene();

    // TODO camera, for now here...
    camera = new OrthograficCamera(4, 1, 0.1, 10);

    auto view = _registry.view<TransformComponent, MaterialComponent, VaoComponent>();
    for (auto e : view)
    {
        Entity entity(e, &_registry);
        draw(entity);
    }

    // _renderer.endScene();
    delete camera;
}

void Scene::draw(Entity entity)
{
    // NOTE: we do not check for existance of these componenets, we rely on 
    // function calling this one checking for it
    // TODO check for existance?
    auto &transform = entity.getComponent<TransformComponent>();
    auto &material = entity.getComponent<MaterialComponent>();
    auto &vao = entity.getComponent<VaoComponent>();

    camera->updateTarget(transform.position);
    material.cacheUniformValue("u_view_matrix", camera->getView());
    material.cacheUniformValue("u_perspective_matrix", camera->getPerspective());

    material.cacheUniformValue("u_model_matrix", transform.getTransformMatrix());
    _renderer.submit(*vao.vao.get(), material);
}

}  // namespace Sage