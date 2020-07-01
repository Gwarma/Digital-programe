 var Move = pc.createScript('movement');

//So I made a few changes. First, I changed the scripts name to movement, as move is already a pre-made script in PlayCanvas projects I think. I also changed
//the code from wasPressed to isPressed so you don't have to keep pressing the keys to get movement. I also added in ammo (there's an ammo folder in your project now).
//Although, the cube's movements are a bit weird might I say. If the movement is exactly what you want, then I don't think you need to make any further changes.
//If it isn't what you had in mind, you can always tell me by replying to me on your post or make a comment here like I did.

Move.attributes.add('speed', {
    type: 'number',    
    default: 0.1,
    min: 0.05,
    max: 0.5,
    precision: 2,
    description: 'Controls the movement speed'
});

// initialize code called once per entity
Move.prototype.initialize = function() {
    this.force = new pc.Vec3();
    //Initialized Key Events
    this.app.keyboard.on(pc.EVENT_KEYDOWN, this.onKeyDown, this);
    this.app.keyboard.on(pc.EVENT_KEYUP, this.onKeyUp, this);
};

// update code called every frame
Move.prototype.update = function(dt) {
    var forceX = 0;
    var forceZ = 0;
    
    // calculate force based on pressed keys
    if (this.app.keyboard.isPressed(pc.KEY_LEFT)) {
        forceZ = -this.speed;
    } 

    if (this.app.keyboard.isPressed(pc.KEY_RIGHT)) {
        forceZ += this.speed;
    }

    if (this.app.keyboard.isPressed(pc.KEY_UP)) {
        forceX += this.speed;
    } 

    if (this.app.keyboard.isPressed(pc.KEY_DOWN)) {
        forceX = -this.speed;
    }

    this.force.x = forceX;
    this.force.z = forceZ;

    // if we have some non-zero force
    if (this.force.length()) {

        // calculate force vector
        var rX = Math.cos(-Math.PI * 0.25);
        var rY = Math.sin(-Math.PI * 0.25);
        this.force.set(this.force.x * rX - this.force.z * rY, 0, this.force.z * rX + this.force.x * rY);

        // clamp force to the speed
        if (this.force.length() > this.speed) {
            this.force.normalize().scale(this.speed);
        }
    }

    // apply impulse to move the entity
    this.entity.rigidbody.applyImpulse(this.force);
};
// swap method called for script hot-reloading
// inherit your script state here
// Move.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/