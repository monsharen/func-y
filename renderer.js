// COLOR SCHEME: https://material.io/guidelines/style/color.html#color-color-palette

function Renderer(canvasBackground, canvasForeground) {
    var skin = new Skin();
    var trackPaddingLeft = 100;

    this.ctxBackground = canvasBackground.getContext('2d');
    this.ctxForeground = canvasForeground.getContext('2d');
    this.canvasW = canvasBackground.width;
    this.canvasH = canvasBackground.height;
    this.unitSize = 32;
    this.currentPosition = 0;

    this.redrawSong = function(song) {        
        this.ctxBackground.fillStyle = skin.backgroundColor;
        this.ctxBackground.fillRect(0, 0, this.canvasW, this.canvasH);
        //console.log("targetTracks: " + song.targetTracks.length, song.targetTracks);
        for (var i = 0; i < song.tracks.length; i++) {
            var track = song.tracks[i];
            this.drawTrackLane(i, track);
            this.drawTrack(i, song, track);
        }
        this.drawGrid();
    }

    this.drawPosition = function(i) {
        var padding = this.unitSize / 2;
        this.ctxForeground.clearRect(0, 0, this.canvasW, this.canvasH);
        this.ctxForeground.strokeStyle = skin.trackPositionColor;
        this.ctxForeground.lineWidth = this.unitSize;
        this.ctxForeground.beginPath();
        this.ctxForeground.moveTo(trackPaddingLeft + i * this.unitSize + padding, 0);
        this.ctxForeground.lineTo(trackPaddingLeft + i * this.unitSize + padding, this.canvasH);
        this.ctxForeground.stroke();
    }

    this.drawGrid = function() {
        this.ctxBackground.strokeStyle = skin.gridColor;
        var columns = this.canvasW / this.unitSize;
        var rows = this.canvasH / this.unitSize;
        this.ctxBackground.lineWidth=1;
        for (var x = 0; x < columns; x++) {
            this.ctxBackground.beginPath();
            this.ctxBackground.moveTo(trackPaddingLeft + x * this.unitSize, 0);
            this.ctxBackground.lineTo(trackPaddingLeft + x * this.unitSize, this.canvasW);
            this.ctxBackground.stroke();
        }
        this.ctxBackground.lineWidth=1;
        for (var y = 0; y < rows; y++) {
            this.ctxBackground.beginPath();
            this.ctxBackground.moveTo(0, y * this.unitSize);
            this.ctxBackground.lineTo(this.canvasW, y * this.unitSize);
            this.ctxBackground.stroke();
        }
    }

    this.drawTrackLane = function(trackRow, track) {
        this.ctxBackground.fillStyle = skin.trackNameColor;
        this.ctxBackground.font = "15px Arial";
        this.ctxBackground.fillText(track.name, 0, ((trackRow + 1) * this.unitSize) - 2);
    }

    this.drawTrack = function(trackRow, song, track) {
        console.log("drawing target notes: " + track.targetNotes.length);
        for (var i = 0; i < song.length; i++) {
            var notes = track.targetNotes[i];
            if (notes != undefined) {
                for (var note in notes) {
                    if (note != 0) {
                        this.drawNote(i * this.unitSize, trackRow * this.unitSize, note, skin.noteTargetColor);
                    }
                }
            }
            notes = track.notes[i];
            if (notes != undefined) {
                for (var note in notes) {
                    if (note != 0) {
                        this.drawNote(i * this.unitSize, trackRow * this.unitSize, note, skin.noteColor);
                    }
                }
            }

        }
/*
        for (var i = 0; i < track.targetNotes.length; i++) {
            
            console.log("drawing note at " + notes);
            if (notes != undefined) {
                for (var note in notes) {
                    if (note != 0) {
                        this.drawNote(i * this.unitSize, trackRow * this.unitSize, note, skin.noteTargetColor);
                    }
                }
            }
        }
        for (var i = 0; i < track.notes.length; i++) {
            
            if (notes != undefined) {
                for (var note in notes) {
                    if (note != 0) {
                        this.drawNote(i * this.unitSize, trackRow * this.unitSize, note, skin.noteColor);
                    }
                }
            } 
        }
        */
    }

    this.drawNote = function(x, y, note, noteColor) {
        this.ctxBackground.beginPath();
        this.ctxBackground.fillStyle = noteColor;
        this.ctxBackground.fillRect(trackPaddingLeft + x, y + this.unitSize - (note*4), this.unitSize, 4);
        this.ctxBackground.stroke();
    }
}

function Skin() {
    this.backgroundColor = '#607D8B';
    this.noteColor = '#F44336';
    this.noteTargetColor = '#FFEB3B';
    this.gridColor = '#455A64';
    this.trackNameColor = '#FAFAFA';
    this.trackPositionColor = 'rgba(50,50,75,0.5)';
}