// example import asset
// import imgPath from './assets/img.jpg';
import Sound from './Sound.js'
// import music from '../sounds/tell_me.mp3'
import music from '../sounds/tell_me_compressed.mp3'

export default class App {

    constructor() {

        this.posX = 0
        this.posY = 0
        this.posZ = 0

        this.i = 0
        this.time = 0;

        this.bassTempo = 0;
        this.kickTempo = 0;

        this.play = true;

        this.fastMotion = false;

        this.meshArray = []
        this.cmptMeshArray = 0
        this.endTrigger = false;

        this.boxArray = []
        this.rotationBoxArray = []

        this.indexArrayReturn = 0

        this.mute = document.querySelector('.sound_on')
        this.unMute = document.querySelector('.sound_off')

        this.container = document.querySelector( '#main' );
        document.body.appendChild( this.container );

        this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 300 );
        this.camera.position.x = 5;
        this.camera.position.y = 5;
        this.camera.position.z = 5;

        this.camera2 = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 300 );
        this.camera2.position.x = 5;
        this.camera2.position.y = 5;
        this.camera2.position.z = 5;

        this.scene = new THREE.Scene();

        this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        this.scene.add(this.directionalLight)

        let ambientLight = new THREE.AmbientLight( 0x3c3c3c );
        this.scene.add( ambientLight );

        /**
        * AudioAnalyser setup
        */
        this.audio = new Sound( music, 98, .3, () => {
            document.querySelector('.start').classList.remove('hidden')
            document.querySelector('.start').classList.add('block')

            document.querySelector('.loading_text').classList.add('hidden')
            document.querySelector('.loading_text').classList.remove('block')
        }, false)

        var btn = document.querySelector('.start')
        btn.addEventListener('click', () => {
            this.audio.play()
            this.start = true
        })


        /**
        * Mute music
        */
        this.mute.addEventListener('click', () => {
            this.audio.volume = 0
            this.mute.classList.toggle('hidden')
            this.unMute.classList.toggle('hidden')
        })
        this.unMute.addEventListener('click', () => {
            this.audio.volume = 1
            this.mute.classList.toggle('hidden')
            this.unMute.classList.toggle('hidden')
        })

        /**
        * Event on music kick
        */
        this.kick = this.audio.createKick({
            frequency: 160,
            decay:0.5,
            threshold: 20,
            onKick: () => {

                if(this.kickTempo > 10){
                    this.kickTempo = 0
                    this.mesh.scale.x = Math.abs(Math.cos(this.audio.frequencyDataArray[160]))*15
                    this.mesh.scale.y = Math.abs(Math.sin(this.audio.frequencyDataArray[160]))*15
                    this.mesh.scale.z = 2
                    this.stepSize = 2;
                }
            },
        })
        this.kick.on()

        /**
        * Event on music bass
        */
        this.kick = this.audio.createKick({
            frequency: 3,
            decay:0.1,
            threshold: 240,
            onKick: () => {
                if(this.bassTempo > 10){
                    this.rotationBoxArray.push(this.mesh)
                    this.bassTempo=0
                    this.mesh.scale.x = 5
                    this.mesh.scale.y = 5
                    this.mesh.scale.z = 5
                    this.stepSize = 5;
                    this.mesh.rotation.x += 0.8
                }
            },
        })
        this.kick.on()

        /**
        * Event beggining
        */
        this.audio.between('Scale begin', 3.5, 4.2, () => {
            this.mesh.scale.x = 4
            this.mesh.scale.z = 4
        })

        /**
        * Event reverse effect
        */
        this.arrayReturn = []

        this.audio.between('store shape', 16.3, 22, () => {
            this.arrayReturn.push(this.mesh)
        })

        this.audio.between('Reverse effect', 22, 23.8, () => {
            this.play = false;
            this.fastMotion = true

            if(this.indexArrayReturn < this.arrayReturn.length) {
                this.arrayReturn[this.indexArrayReturn].scale.x = 0.01
                this.arrayReturn[this.indexArrayReturn].scale.y = 0.01
                this.arrayReturn[this.indexArrayReturn].scale.z = 0.01

                if(this.arrayReturn[this.indexArrayReturn+1]){
                    this.arrayReturn[this.indexArrayReturn+1].scale.x = 0.01
                    this.arrayReturn[this.indexArrayReturn+1].scale.y = 0.01
                    this.arrayReturn[this.indexArrayReturn+1].scale.z = 0.01
                }


                if(this.arrayReturn[this.indexArrayReturn+2]){
                    this.arrayReturn[this.indexArrayReturn+2].scale.x = 0.01
                    this.arrayReturn[this.indexArrayReturn+2].scale.y = 0.01
                    this.arrayReturn[this.indexArrayReturn+2].scale.z = 0.01
                }

                if(this.arrayReturn[this.indexArrayReturn+3]){
                    this.arrayReturn[this.indexArrayReturn+3].scale.x = 0.01
                    this.arrayReturn[this.indexArrayReturn+3].scale.y = 0.01
                    this.arrayReturn[this.indexArrayReturn+3].scale.z = 0.01
                }

                this.indexArrayReturn += 4
            }

        })

        /**
        * Reset normal play
        */
        this.audio.onceAt('normal play', 23.81, () => {
            this.play = true
            this.fastMotion = false
        })


        /**
        * End of music
        */
        this.audio.onceAt('end', 42.4, () => {
            this.audio.pause()
            this.play = false
            this.endTrigger = true
        })

        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.container.appendChild( this.renderer.domElement );

        window.addEventListener('resize', this.onWindowResize.bind(this), false);
        this.onWindowResize();


        this.renderer.animate( this.render.bind(this) );
        var canvas = document.querySelector('#main canvas')

        this.start = false
    }

    render() {
        if(this.start == true){
            if(this.play == true) {
                this.boxGeometry = new THREE.BoxGeometry( 0.05, 0.05, 0.05 );
                this.boxMaterial = new THREE.MeshNormalMaterial();

                this.mesh = new THREE.Mesh(this.boxGeometry, this.boxMaterial);

                this.boxArray.push(this.mesh)

                var NORTH = 0;
                var EAST = 1;
                var SOUTH = 2;
                var WEST = 3;
                var BACKWARD = 4
                var FORWARD = 5
                var direction;
                this.stepSize = 0.2;

                this.bassTempo += 1
                this.kickTempo += 1

                direction = Math.floor(Math.random() * 6);

                this.mesh.position.x = this.posX
                this.mesh.position.y = this.posY
                this.mesh.position.z = this.posZ

                if(direction == NORTH){
                    this.posY += this.stepSize
                }

                if(direction == SOUTH){
                    this.posY -= this.stepSize
                }

                if(direction == EAST){
                    this.posX += this.stepSize
                }

                if(direction == WEST){
                    this.posX -= this.stepSize
                }

                if(direction == BACKWARD){
                    this.posZ -= this.stepSize
                }

                if(direction == FORWARD){
                    this.posZ += this.stepSize
                }

                this.scene.add(this.mesh)
                this.meshArray.push(this.mesh)
                this.cmptMeshArray += 1
            }

            this.i += 1

            if(this.fastMotion == false){
                this.time += 0.01
            } else {
                this.time -= 0.04
            }



            this.camera2.position.x = this.mesh.position.x + 7 * Math.cos( this.time );
            this.camera2.position.z = this.mesh.position.z + 7 * Math.sin( this.time );

            if(this.endTrigger == false){
                this.camera2.lookAt( this.mesh.position );
            } else {
                this.endTarget = Math.floor(this.cmptMeshArray / 2)
                this.camera2.position.x = this.meshArray[this.endTarget].position.x + 10 * Math.cos( this.time );
                this.camera2.position.z = this.meshArray[this.endTarget].position.z + 10 * Math.sin( this.time );
                this.camera2.lookAt( this.meshArray[this.endTarget].position );
            }

            this.camera.rotation.x += (this.camera2.rotation.x - this.camera.rotation.x) / 60;
            this.camera.rotation.y += (this.camera2.rotation.y - this.camera.rotation.y) / 60;

            this.camera.position.x += (this.camera2.position.x - this.camera.position.x) / 60;
            this.camera.position.z += (this.camera2.position.z - this.camera.position.z) / 60;

            if(this.camera.rotation.z < -3){
                this.camera.rotation.z += -0.01
            } else {
                this.camera.rotation.z += (this.camera2.rotation.z - this.camera.rotation.z) / 10;
            }
        }

        this.directionalLight.position.x += 0.1
        this.directionalLight.position.y += 10
        this.directionalLight.position.z += 20

        this.renderer.render( this.scene, this.camera );
        this.renderer.setClearColor (0xfdeff9, 1);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
    }
}
