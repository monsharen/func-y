function Song(name, length) {
	this.name = name;
	this.length = length;
	this.tracks = [];
}

function Track(name) {
	this.name = name;
	this.notes = [];
	this.targetNotes = [];
	this.note = function(index, note) {
		if (note > 0 && note < 9) {
			var n = this.notes[index];
			if (n === undefined) {
				n = [];
			}
			n[note] = 1;
			this.notes[index] = n;
		} else {
			this.notes[index] = undefined;
		}
	}

	/*
	 * Remove this
	 */
	this.targetNote = function(index, note) {
		var n = this.targetNotes[index];
		if (n === undefined) {
			n = [];
		}
		n[note] = 1;
		this.targetNotes[index] = n;
	}
}