class Game {
    constructor (options = {}) {
        // Game Options
        this.gameContainer = options.gameContainer || 'gameContainer';
        this.gameBackground = options.gameBackground || '#333333';

        // Width & Height
        this.gameWidth = options.gameWidth || document.getElementById(this.gameContainer).clientWidth;
        this.gameHeight = options.gameHeight || document.getElementById(this.gameContainer).clientHeight;

        // Colors
        this.colors = {
            darker: '#111111',
            dark: '#333333',
            red: '#F20B5F',
            redHover: '#C60D50',
            blue: '#00FFFF',
            blueHover: '#07E3E3',
            yellow: '#FFE74C',
            yellowHover: '#E4CF46',
            white: '#FFFFFF'
        }

        // Stages
        this.menuStage;
    }

    // Initialize
    init () {
        console.log('Game Initialized');

        this.menuStage();   
    }

    menuStage () {
        this.menuStage = new Konva.Stage({
            container: this.gameContainer,
            x: 0,
            y: 0,
            width: this.gameWidth,
            height: this.gameHeight
        });

        // Background Layer
        let backgroundLayer = new Konva.Layer();
        
        let backgroundObject = new Konva.Rect({
            x: 0,
            y: 0,
            width: this.gameWidth,
            height: this.gameHeight,
            fill: this.gameBackground
        });

        backgroundLayer.add(backgroundObject);

        // Menu Layer
        let menuLayer = new Konva.Layer({
            x: this.gameWidth / 2 - 400,
            y: 0,
            width: 800,
            height: this.gameHeight
        });

        // Menu Layer - Background
        let menuBackgroundObject = new Konva.Rect({
            x: 0,
            y: 0,
            width: 800,
            height: this.gameHeight,
            fill: this.colors.darker
        });

        menuLayer.add(menuBackgroundObject);

        // Calculate gap
        let gap = (800 - 600) / 4;

        // Menu Layer - Normal Mode
        let normalMode = new Konva.Rect({
            x: gap,
            y: 100,
            width: 200,
            height: this.gameHeight - 200,
            fill: this.colors.red,
            cornerRadius: 8
        });

        normalMode.on('click', () => {
            console.log('1');
        });

        normalMode.on('mouseover', () => {
            normalMode.fill(this.colors.redHover);

            this.menuStage.container().style.cursor = 'pointer';
            menuLayer.draw();
        });

        normalMode.on('mouseout', () => {
            normalMode.fill(this.colors.red);

            this.menuStage.container().style.cursor = 'default';
            menuLayer.draw();
        });

        let normalModeContent = new Konva.Text({
            x: normalMode.getPosition().x + 20,
            y: normalMode.getPosition().y + normalMode.height() / 2 - 18,
            text: 'Normal',
            fontSize: 18,
            fontFamily: 'Montserrat',
            fill: this.colors.white,
            width: normalMode.width() - 40,
            align: 'center'
        });

        menuLayer.add(normalMode);
        menuLayer.add(normalModeContent);

        // Menu Layer - Hard Mode
        let hardMode = new Konva.Rect({
            x: 2 * gap + 200,
            y: 100,
            width: 200,
            height: this.gameHeight - 200,
            fill: this.colors.blue,
            cornerRadius: 8
        });

        hardMode.on('click', () => {
            console.log('2');
        });

        hardMode.on('mouseover', () => {
            hardMode.fill(this.colors.blueHover);

            this.menuStage.container().style.cursor = 'pointer';
            menuLayer.draw();
        });

        hardMode.on('mouseout', () => {
            hardMode.fill(this.colors.blue);

            this.menuStage.container().style.cursor = 'default';
            menuLayer.draw();
        });

        let hardModeContent = new Konva.Text({
            x: hardMode.getPosition().x + 20,
            y: hardMode.getPosition().y + hardMode.height() / 2 - 18,
            text: 'Hard',
            fontSize: 18,
            fontFamily: 'Montserrat',
            fill: this.colors.white,
            width: hardMode.width() - 40,
            align: 'center'
        });

        menuLayer.add(hardMode);
        menuLayer.add(hardModeContent);

        // Menu Layer - Options
        let options = new Konva.Rect({
            x: 3 * gap + 400,
            y: 100,
            width: 200,
            height: this.gameHeight - 200,
            fill: this.colors.yellow,
            cornerRadius: 8
        });

        options.on('click', () => {
            console.log('3');
        });

        options.on('mouseover', () => {
            options.fill(this.colors.yellowHover);

            this.menuStage.container().style.cursor = 'pointer';
            menuLayer.draw();
        });

        options.on('mouseout', () => {
            options.fill(this.colors.yellow);

            this.menuStage.container().style.cursor = 'default';
            menuLayer.draw();
        });

        let optionsContent = new Konva.Text({
            x: options.getPosition().x + 20,
            y: options.getPosition().y + options.height() / 2 - 18,
            text: 'Options',
            fontSize: 18,
            fontFamily: 'Montserrat',
            fill: this.colors.white,
            width: options.width() - 40,
            align: 'center'
        });

        menuLayer.add(options);
        menuLayer.add(optionsContent);

        // Combine Layers
        this.menuStage.add(backgroundLayer);
        this.menuStage.add(menuLayer);
    }
}

window.onload = function () {
    const RL = new Game();
    RL.init();
}