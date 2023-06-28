#pragma once

#include "AsteroidParams.h"
#include "ObservationsConfig.h"
#include "GlmParser.h"
#include "Units.h"
#include "JulianDay.h"

#include <nlohmann/json.hpp>
#include <glm/vec3.hpp>

#include <string>
#include <vector>
#include <filesystem>

namespace Sage {

// TODO grrr...
using namespace UnitLiterals;
struct ObsPoint
{
    JulianDay julianDay{0_jd};
    Angle<Units::Radian> rotPhase{0_rad};
    unsigned int step{0};

    Magnitude magnitude{0_mag};
    glm::vec3 observerPosition{0};
    glm::vec3 targetPosition{0};
};

using Lightcurve = std::vector<ObsPoint>;

struct LightcurveStorage
{
    SceneConfig sceneConfig;
    AsteroidParams asteroidParams;
    std::vector<Lightcurve> lightcurves;
};

// TODO
struct AOImage {};

struct AOStorage
{
    SceneConfig sceneConfig;
    AsteroidParams asteroidParams;
    std::vector<AOImage> images;
};

struct RadarImage {};

struct RadarStorage
{
    SceneConfig sceneConfig;
    AsteroidParams asteroidParams;
    std::vector<RadarImage> images;
};

void from_json(const nlohmann::json &j, LightcurveStorage &obs);
void to_json(nlohmann::json &j, const LightcurveStorage &p);

void from_json(const nlohmann::json &j, ObsPoint &p);
void to_json(nlohmann::json &j, const ObsPoint &p);

}  // namespace Sage
