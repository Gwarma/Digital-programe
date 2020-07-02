var Teleport = pc.createScript('teleport');

Teleport.prototype.initialize = function() {
    this.lastTeleportFrom = null;
    this.lastTeleportTo = null;
    this.lastTeleport = Date.now(); 
    this.startPosition = this.entity.getPosition().clone();       
};

// update code called every frame
Teleport.prototype.update = function(dt) {
    // Make sure we don't fall over. If we do then
    // teleport to the last location
    var pos = this.entity.getPosition();
    if (pos.y < 0) {
        this.teleport(this.lastTeleportFrom, this.lastTeleportTo);
    }
};


Teleport.prototype.teleport = function(from, to) {
    // can't teleport too often (500ms)
    if (from && (Date.now() - this.lastTeleport) < 500)
        return;

    // set new teleport time
    this.lastTeleport = Date.now();

    // set last teleport targets
    this.lastTeleportFrom = from;
    this.lastTeleportTo = to;

    // position to teleport to
    var position;

    if (to) {
        // from target
        position = to.getPosition();
        // move a bit higher
        position.y += 0.5;
    } else {
        // to respawn location
        position = this.startPosition;
    }

    // move ball to that point
    this.entity.rigidbody.teleport(position);
    // need to reset angular and linear forces
    this.entity.rigidbody.linearVelocity = pc.Vec3.ZERO;
    this.entity.rigidbody.angularVelocity = pc.Vec3.ZERO;            
};

// swap method called for script hot-reloading
// inherit your script state here
// Teleport.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/