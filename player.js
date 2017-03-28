function Player(renderer) {
	var renderer = renderer;
	var currentPosition = 0;
	var interval = null;
	var drumSounds = [];
	var synths = [];
	var song;
	var playing = false;

	this.init = function() {
		T("audio").load("https://mohayonao.github.io/timbre.js/misc/audio/drumkit.wav", function() {
			drumSounds[1] = this.slice(   0,  500).set({bang:false});
			drumSounds[2] = this.slice( 500, 1000).set({bang:false});
			drumSounds[3] = this.slice(1000, 1500).set({bang:false, mul:0.2});
			drumSounds[4] = this.slice(1500, 2000).set({bang:false, mul:0.2});
			drumSounds[5] = this.slice(2000).set({bang:false, mul:0.2});
			var drum = T("lowshelf", {freq:110, gain:8, mul:0.6}, drumSounds[1], drumSounds[2], drumSounds[3], drumSounds[4], drumSounds[5]).play();
    		var RATIOS = ["1/1", "9/8", "5/4", "4/3", "3/2", "5/3", "7/4", "2/1"];
        	var BASE_FREQ = 100;
        	for (var i=0; i < RATIOS.length; i++) {
				var freq = BASE_FREQ * eval(RATIOS[i]);
				var freqSlide = T("param", {value: freq * (9/8)}).to(freq, 100);
				var synth = T(
					"perc", {a: 100, r: 400},
					T("sin", {freq: freqSlide, mul: 0.25}),
				 	T("sin", {freq: freqSlide * 1.01, mul: 0.05, phase: Math.PI * 0.25}),
					T("eq", {lpf: [100, 0.0, -48.0]},
						T("sin", {freq: freqSlide * 2, mul: 0.25})
				    ),
					T("perc", {r: 10},
						T("saw", {freq: freqSlide * 4, mul: 0.05})
					),
					T("perc", {a: 100, r: 100},
						T("noise", {mul:0.0})
					)
				).play();
				synths.push(synth);
			}
		});
	}

	this.play = function(songIn) {
		if (playing) {
			reset();
			return;
		}
		playing = true;
		song = songIn;
		currentPosition = 0;
		var tempo = 10; // bpm
		interval = setInterval(playInternal, 100);
	}

	function reset() {
		playing = false;
		clearInterval(interval);
	}

	function playInternal() {
		if (currentPosition >= song.length) {
			currentPosition = 0;
		}
		renderer.drawPosition(currentPosition);

		var drums = song.tracks[0];
		playTrack(drums, drumSounds);

 		for (var a = 1; a < song.tracks.length; a++) {
			var track = song.tracks[a];
			var notes = track.notes[currentPosition];
			for (var note in notes) {
				synths[note].bang();
			}
			
		}
		currentPosition++;
	}

	function playTrack(track, soundBank) {
		var notes = track.notes[currentPosition];
		for (var note in notes) {
			if (note > 0) {
				soundBank[note].bang();
			}
		}
	}

	this.init();
}
