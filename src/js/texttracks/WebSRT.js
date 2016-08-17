/**
 * Moovie: an advanced HTML5 video player for MooTools.
 *
 * Gives Moovie the ability to support .srt files using <track> elements.
 *
 * @version 0.4.5
 * @author Colin Aarts <colin@colinaarts.com> (http://colinaarts.com)
 * @author Nathan Bishop <nbish11@hotmail.com>
 * @copyright 2010 Colin Aarts
 * @license MIT
 */
import SRTCue from './SRTCue';

const WebSRT = {};

WebSRT.Parser = new Class({
    initialize: function () {
        this.oncue = Function.from();
        this.onflush = Function.from();
        this.onparsingerror = Function.from();
        this.buffer = '';
        this.cues = [];
    },

    computeSeconds: function (h, m, s, f) {
        const hours = h.toInt() * 3600;
        const minutes = m.toInt() * 60;
        const seconds = s.toInt();
        const milliseconds = f.toInt() / 1000;

        return hours + minutes + seconds + milliseconds;
    },

    // Timestamp must take the form of [hours]:[minutes]:[seconds],[milliseconds]
    parseTimeStamp: function (input) {
        const matches = input.match(/^(\d{2}):(\d{2}):(\d{2}),(\d{3})/);

        if (!matches) {
            return null;
        }

        return this.computeSeconds(matches[1], matches[2], matches[3], matches[4]);
    },

    parse: function (data) {
        this.buffer = this.buffer + data;
    },

    flush: function () {
        const rawCues = this.buffer.replace(/\r?\n/gm, '\n').trim().split('\n\n');

        rawCues.each((rawCueBlock) => {
            const cueLines = rawCueBlock.split('\n');
            const cueid = cueLines.shift();
            const cuetc = cueLines.shift().split(' --> ');
            const cueobj = new SRTCue(
                this.parseTimeStamp(cuetc[0]),
                this.parseTimeStamp(cuetc[1]),
                cueLines.join('\n')
            );

            cueobj.id = cueid;
            this.oncue.call(this, cueobj);
        });

        this.onflush.call(this);
    }
});

export { WebSRT as default };
