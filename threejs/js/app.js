'use strict';

let m;

function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({ canvas });

    const fov = 75;
    const aspect = 2;
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    const elem_x_rot = document.querySelector('#x');
    const elem_y_rot = document.querySelector('#y');
    const elem_z_rot = document.querySelector('#z');

    const elem_cam_x = document.querySelector('#cam_x');
    const elem_cam_y = document.querySelector('#cam_y');
    const elem_cam_z = document.querySelector('#cam_z');

    camera.position.set(2, 4, 3);

    const controls = new THREE.OrbitControls(camera, canvas);
    controls.target.set(0, 0, 0);
    controls.update();

    const scene = new THREE.Scene();

    {
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);
    }

    {
        const planeSize = 20;

        const loader = new THREE.TextureLoader();
        const texture = loader.load('images/checker.png');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.NearestFilter;
        const repeats = planeSize / 2;
        texture.repeat.set(repeats, repeats);

        const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
        const planeMat = new THREE.MeshPhongMaterial({
          map: texture,
          side: THREE.DoubleSide,
        });
        const mesh = new THREE.Mesh(planeGeo, planeMat);
        mesh.position.y = -1;
        mesh.rotation.x = Math.PI * -.5;
        scene.add(mesh);
    }

    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    function makeInstance(geometry, color, x) {
        const material = new THREE.MeshPhongMaterial({ color });
        const cube = new THREE.Mesh(geometry, material);

        scene.add(cube);
        cube.position.x = x;

        return cube;
    }

    const cubes = [
        makeInstance(geometry, 0x44aa88, 0),
    ];

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    function render(time) {
        time *= 0.001; // convert time to seconds

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        cubes.forEach((cube, ndx) => {
            const speed = 1 + ndx * .1;
            const rot = time * speed;

            cube.rotation.x = rot;
            cube.rotation.y = rot;

            elem_x_rot.textContent = cube.rotation.x.toFixed(3);
            elem_y_rot.textContent = cube.rotation.y.toFixed(3);
            elem_z_rot.textContent = cube.rotation.z.toFixed(3);

            elem_cam_x.textContent = camera.position.x.toFixed(3);
            elem_cam_y.textContent = camera.position.y.toFixed(3);
            elem_cam_z.textContent = camera.position.z.toFixed(3);
        });

        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

function doMonitor() {
    m = new Monitor();

    let cbMultiplexed = function(o) {
        console.log(o.data);
    };

    let cbConnected = function() {
        document.querySelector('#connect').innerText = 'Disconnect';
        document.querySelector('#connect').disabled = false;
    };

    let cbDisconnected = function() {
        document.querySelector('#connect').innerText = 'Connect';
        document.querySelector('#connect').disabled = false;

        return m.removeEventListener('disconnect', cbDisconnected);
    };

    let cbConnecting = function() {
        document.querySelector('#connect').innerText = 'Connecting';
        document.querySelector('#connect').disabled = true;
    }

    document.querySelector("#connect").addEventListener('click', function() {
        if (m.connected()) {
            m.removeEventListener('multiplexed-information', cbMultiplexed)
            .then(() => {
                m.disconnect();
            })
            .catch(error => {
                console.log(error);
            });
        } else {
            m.connect()
            .then(() => {
                cbConnecting();
                return m.addEventListener('multiplexed-information', cbMultiplexed)
            })
            .then(() => {
                return m.addEventListener('disconnect', cbDisconnected);
            })
            .then(() => {
                cbConnected();
            })
            .catch(error => {
                console.log(error);
            });
        }
    });
}

main();
doMonitor();
