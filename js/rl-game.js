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
            gray: '#C8C8C8',
            white: '#FFFFFF'
        }

        // Layers Options
        this.layersOptions = {
            x: this.gameWidth / 2 - 400,
            y: 0,
            width: 800,
            height: this.gameHeight
        }

        // Stages
        this.gameStage;

        // Layers
        this.backgroundLayer;
        this.menuLayer;
        this.normalModeLayer;
        this.hardModeLayer;
        this.optionsLayer;
        this.UILayer;
    }

    // Initialize
    init () {
        console.log('Game Initialized');

        this.gameStage();   
    }

    gameStage () {
        this.gameStage = new Konva.Stage({
            container: this.gameContainer,
            x: 0,
            y: 0,
            width: this.gameWidth,
            height: this.gameHeight
        });

        // Background Layer
        this.backgroundLayer = new Konva.Layer();
        
        let backgroundObject = new Konva.Rect({
            x: 0,
            y: 0,
            width: this.gameWidth,
            height: this.gameHeight,
            fill: this.gameBackground
        });

        this.backgroundLayer.add(backgroundObject);

        // Menu Layer
        this.menuLayer = new Konva.Layer(this.layersOptions);

        // Menu Layer - Background
        let menuBackgroundObject = new Konva.Rect({
            x: 0,
            y: 0,
            width: 800,
            height: this.gameHeight,
            fill: this.colors.darker
        });

        this.menuLayer.add(menuBackgroundObject);

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
            this.normalMode();
        });

        normalMode.on('mouseover', () => {
            normalMode.fill(this.colors.redHover);

            this.gameStage.container().style.cursor = 'pointer';
            this.menuLayer.draw();
        });

        normalMode.on('mouseout', () => {
            normalMode.fill(this.colors.red);

            this.gameStage.container().style.cursor = 'default';
            this.menuLayer.draw();
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

        this.menuLayer.add(normalMode);
        this.menuLayer.add(normalModeContent);

        // Menu Layer - Hard Mode
        let hardMode = new Konva.Rect({
            x: 2 * gap + 200,
            y: 100,
            width: 200,
            height: this.gameHeight - 200,
            fill: this.colors.gray,
            cornerRadius: 8
        });

        hardMode.on('click', () => {
            console.log('2');
        });

        hardMode.on('mouseover', () => {
            hardMode.fill(this.colors.gray);

            this.gameStage.container().style.cursor = 'pointer';
            this.menuLayer.draw();
        });

        hardMode.on('mouseout', () => {
            hardMode.fill(this.colors.gray);

            this.gameStage.container().style.cursor = 'default';
            this.menuLayer.draw();
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

        this.menuLayer.add(hardMode);
        this.menuLayer.add(hardModeContent);

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

            this.gameStage.container().style.cursor = 'pointer';
            this.menuLayer.draw();
        });

        options.on('mouseout', () => {
            options.fill(this.colors.yellow);

            this.gameStage.container().style.cursor = 'default';
            this.menuLayer.draw();
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

        this.menuLayer.add(options);
        this.menuLayer.add(optionsContent);

        // Combine Layers
        this.gameStage.add(this.backgroundLayer);
        this.gameStage.add(this.menuLayer);
    }

    normalMode () {
        console.log('Normal Mode');

        // Destroy Menu Layer
        this.menuLayer.destroy();

        // Initialize UI
        this.initUI();

        // Create Normal Mode Layer
        this.normalModeLayer = new Konva.Layer(this.layersOptions);

        // Menu Layer - Background
        let backgroundObject = new Konva.Rect({
            x: 0,
            y: 0,
            width: 800,
            height: this.gameHeight,
            fill: this.colors.darker
        });

        this.normalModeLayer.add(backgroundObject);

        // Combine Layers
        this.gameStage.add(this.normalModeLayer);
    }

    initUI () {
        this.UILayer = new Konva.Layer();

        // Score Tracker
        let scoreTrackerBackground = new Konva.Rect({
            x: 40,
            y: 40,
            width: 300,
            height: 80,
            fill: this.colors.darker
        });

        this.UILayer.add(scoreTrackerBackground);

        // Song's Info
        // Song's Progress Bar
        let progressBar = new Konva.Rect({
           x: 40,
           y: this.gameHeight - 48,
           width: 300,
           height: 8,
           cornerRadius: 8,
           fill: this.colors.darker 
        });

        this.UILayer.add(progressBar);

        let progressBarColor = new Konva.Rect({
            x: 40,
            y: this.gameHeight - 48,
            width: 100,
            height: 8,
            cornerRadius: 8,
            fill: this.colors.red 
        });

        this.UILayer.add(progressBarColor);

        // Song's Name
        let name = new Konva.Text({
            x: 40,
            y: progressBar.getPosition().y - 20,
            text: 'Capone - Oh No',
            fontSize: 10,
            fontFamily: 'Montserrat',
            fill: this.colors.white,
        });

        this.UILayer.add(name);

        // Song's Duration
        let duration = new Konva.Text({
            x: 40 + progressBar.width(),
            y: progressBar.getPosition().y - 20,
            text: '1:11 / 3:33',
            fontSize: 10,
            fontFamily: 'Montserrat',
            align: 'right',
            fill: this.colors.white,
        });

        duration.move({x: -duration.width()});

        this.UILayer.add(duration);

        // Combine Layers
        this.gameStage.add(this.UILayer);
    }
}

window.onload = function () {
    const RL = new Game();
    RL.init();
}