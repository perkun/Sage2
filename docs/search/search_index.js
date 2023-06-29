var __index = {"config":{"lang":["en"],"separator":"[\\s\\-]+","pipeline":["stopWordFilter"]},"docs":[{"location":"index.html","title":"About","text":"<p>This project is a collection of algorithms and utilities useful for asteroid shape modeling. The aim is to collect ideas developed throughout the years of working on asteroid shape models and to deliver a coherent software package using modern C++.</p> <p>Additional aim is to unify and  rewrite the code for the SAGE method. SAGE stands for Shaping Asteroids with Genetic Evolution, and is an inversion technique for asteroid shape modeling. Taking lightcurves, adaptive optics images (TODO: stellar occultation cords and radar delay-Doppler images) the method creates 3D shape models and spin state (spin axis orientation and period) of an asteroid best explaining the data. Original paper describing the method can be found here.</p>"},{"location":"index.html#features","title":"Features","text":"<ul> <li>Synthetic observation generation:<ul> <li>lightcurves,</li> <li>adaptive optics,</li> <li>radar delay-Doppler,</li> </ul> </li> <li>SAGE method (TODO)</li> </ul>"},{"location":"ProjectStructure.html","title":"Project's structure","text":""},{"location":"ProjectStructure.html#build-system","title":"Build system","text":"<p><code>premake5</code> is used as underlying build system. Asteroid Farm is organized into workspace and projects. The <code>premake5.lua</code> file in root directory defines the workspace, global include directories and includes individual projects. Projects are stored in separate directories, each containing its own <code>premake5.lua</code> file. <code>premage5</code> generates a master <code>Makefile</code> that includes <code>Makefile</code>s of each project.</p>"},{"location":"ProjectStructure.html#external-libraries","title":"External libraries","text":"<p>Libraries used in projects should be stored in <code>vendor</code> folder. Rules for building can be added to the premake file stored there.</p>"},{"location":"ProjectStructure.html#documentation","title":"Documentation","text":"<p>Documentation is stored in <code>documentation/</code> folder.  The <code>index.md</code> is the main page.</p> <p>Documentation is generated automatically when the whole projetc is build. You need to have <code>mkdocs-material</code> installed:</p> <pre><code>pip install mkdocs-material\n</code></pre> <p>To generate documentation locally:</p> <pre><code>cd docs\nmake\n</code></pre> <p>The output files will be generated in <code>docs</code> folder, which is also under version control. After updating documentation and building it, commit the changes in <code>docs</code> folder as well.</p>"},{"location":"ProjectStructure.html#dependencies","title":"Dependencies","text":"<ul> <li>fmt</li> <li>gtest</li> <li>mkdocs-material</li> </ul>"},{"location":"UserManual/Config.html","title":"Config files","text":"<p>In this project configuration, input and output data is handled in JSON format. In the code writing and parsing is done via nlohmann json library.</p>"},{"location":"UserManual/Config.html#asteroid-parameters","title":"Asteroid Parameters","text":"<p><code>eclipticLongitude</code> and <code>eclipticLatitude</code> in degrees define spin axis orientation in ecliptic reference frame. The rotation is defined by rotation phase (<code>rotPhaseForEpoch</code>, in degrees) at an Julian Day <code>epoch</code>, and a rotation <code>period</code> in hours.</p> <pre><code>\"asteroidParams\": {\n    \"eclipticLongitude\": &lt;deg&gt;,\n    \"eclipticLatitude\": &lt;deg&gt;,\n    \"period\": &lt;hours&gt;,\n    \"epoch\": &lt;julian day&gt;,\n    \"rotPhaseForEpoch\": &lt;deg&gt;\n}\n</code></pre>"},{"location":"UserManual/Config.html#scene","title":"Scene","text":"<p>Scene config groups global scene stuff: path to 3D model and OpenGl shaders.</p> <pre><code>\"scene\": {\n    \"fragmentShaderPath\": \"data/shadow.fs\",\n    \"modelPath\": \"data/asteroid.obj\",\n    \"vertexShaderPath\": \"data/shadow.vs\"\n}\n</code></pre>"},{"location":"UserManual/Config.html#more-to-come","title":"more to come...","text":""},{"location":"UserManual/Generators.html","title":"Synthetic observation generation","text":"<p>There are standalone programs for the purpuse of generating synthetic observations. Programs accept a path to input config file as a parameter and generate observations accordingly.</p>"},{"location":"UserManual/Generators.html#lightcurves","title":"Lightcurves","text":"<p>Project location: <code>Generators/Lightcurve</code></p> <p>Config file Example:</p> <pre><code>{\n    \"scene\": {\n        \"modelPath\": \"data/asteroid.obj\",\n        \"vertexShaderPath\": \"data/shadow.vs\",\n        \"fragmentShaderPath\": \"data/shadow.fs\"\n    },\n    \"asteroidParams\": {\n        \"name\": \"Test target name\",\n        \"eclipticLongitude\": 170,\n        \"eclipticLatitude\": 70,\n        \"period\": 12.123,\n        \"epoch\": 2457999.0334,\n        \"rotPhaseForEpoch\": 44.123\n    },\n    \"lightcurves\": [\n        {\n            \"targetPosition\": [0,4,0],\n            \"observerPosition\": [2, 0, 0],\n            \"lightPosition\": [0, 0, 0],\n            \"startJd\": 2458009.0334,\n            \"numPoints\": 90\n        }\n    ],\n    \"outputPath\": \"data/myLightcurves.json\"\n}\n</code></pre> <p>The output will be saved in a file defined by <code>outputPath</code> parameter. It looks like that:</p> <pre><code>{\n    \"asteroidParams\": {\n        \"eclipticLatitude\": 0.0,\n        \"eclipticLongitude\": 0.0,\n        \"epoch\": 0.0,\n        \"name\": \"\",\n        \"period\": 0.0,\n        \"rotPhaseForEpoch\": 0.0\n    },\n    \"scene\": {\n        \"fragmentShaderPath\": \"\",\n        \"modelPath\": \"\",\n        \"vertexShaderPath\": \"\"\n    },\n    \"lightcurves\": [\n        [\n            {\n                \"julianDay\": 2458009.0334,\n                \"magnitude\": -10.336428851339793,\n                \"observerPosition\": [\n                    2.0,\n                    0.0,\n                    0.0\n                ],\n                \"rotPhase\": 5.0082009092861455,\n                \"step\": 0,\n                \"targetPosition\": [\n                    0.0,\n                    4.0,\n                    0.0\n                ]\n            },\n    ...\n</code></pre> <p>It contains <code>AsteroidConfig</code>, information about the scene and array of lightcurves, which are the arrays of observation points.</p>"},{"location":"UserManual/Generators.html#adaptive-optics","title":"Adaptive Optics","text":"<p>Project location: <code>Generators/AdaptiveOptics</code></p> <p>Adaptive Optics images are just images of a target as visible from the observer's position.</p> <p>Config file example:</p> <pre><code>{\n    \"scene\": {\n        \"modelPath\": \"data/model_shifted.obj\",\n        \"vertexShaderPath\": \"data/shadow.vs\",\n        \"fragmentShaderPath\": \"data/shadow.fs\"\n    },\n    \"asteroidParams\": {\n        \"name\": \"Test target name\",\n        \"eclipticLongitude\": 170,\n        \"eclipticLatitude\": 70,\n        \"period\": 12.123,\n        \"epoch\": 2457999.0334,\n        \"rotPhaseForEpoch\": 74.123\n    },\n    \"aoImages\": [\n        {\n            \"targetPosition\": [0,4,0],\n            \"observerPosition\": [2, 0, 0],\n            \"lightPosition\": [0, 0, 0],\n            \"jd\": 2458009.0334,\n            \"resolution\": 512\n        },\n        {\n            \"targetPosition\": [0,4,0],\n            \"observerPosition\": [2, 2, 1],\n            \"lightPosition\": [0, 0, 0],\n            \"jd\": 2458011.0334,\n            \"resolution\": 100\n        }\n\n    ],\n    \"outputFolderPath\": \"data/AoImages/\",\n    \"imagePrefix\": \"test\"\n}\n</code></pre> <p>The AO images will be saved as <code>.png</code> files named <code>&lt;outputFolderPath&gt;/&lt;imagePrefix&gt;_&lt;i&gt;.png</code>, where <code>i</code> is a consecutive index of an image.</p>"},{"location":"UserManual/Generators.html#radar-delay-doppler","title":"Radar delay-Doppler","text":"<p>Work in progress</p>"},{"location":"UserManual/HowToBuild.html","title":"How to build Asteroid Farm","text":"<p>First, you need to generate <code>Makefile</code>s. To do so, run this command in project's root directory:</p> <pre><code>tools/linux/premake5 gmake\n</code></pre> <p>and then just run</p> <pre><code>make\n</code></pre> <p>to build the whole project. The default cofiguration is <code>Debug</code>. To build <code>Release</code> configuration run</p> <pre><code>make config=release\n</code></pre> <p>Binaries are located in <code>build/&lt;Target&gt;/&lt;Project&gt;</code> directory, where <code>&lt;Target&gt;</code> is either <code>Build</code> or <code>Release</code>.</p>"}]}