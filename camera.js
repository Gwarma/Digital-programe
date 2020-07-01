var camera = pc.createScript('camera');

camera.attributes.add('target', {
    type: 'entity',
    title: 'Target',
    description: 'The Entity to follow'
});

camera.attributes.add('distance', {
    type: 'number',
    default: 4,
    title: 'Distance',
    description: 'How far from the Entity should the follower be'
});

// initialize code called once per entity
camera.prototype.initialize = function() {
    this.vec = new pc.Vec3();
};

// update code called every frame
camera.prototype.update = function(dt) {
    if (!this.target) return;

    // get the position of the target entity
    var pos = this.target.getPosition();

    // calculate the desired position for this entity
    pos.x += -4.75 * this.distance;
    pos.y += 1.0 * this.distance;
    pos.z += 0.01 * this.distance;

    // smoothly interpolate towards the target position
    this.vec.lerp(this.vec, pos, 0.1);

    // set the position for this entity
    this.entity.setPosition(this.vec); 
};

// swap method called for script hot-reloading
// inherit your script state here
// Camera.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/