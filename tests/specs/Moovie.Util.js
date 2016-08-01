describe('Moovie.Util', function () {
    it('should be defined', function () {
        expect(Moovie.Util).toBeDefined();
    });

    describe('formatTime', function () {
        it('should handle seconds below 10', function () {
            expect(Moovie.Util.formatTime(9)).toEqual('0:09');
        });

        it('should handle seconds above 10 and below 1 minute', function () {
            expect(Moovie.Util.formatTime(23)).toEqual('0:23');
        });

        it('should handle seconds equal to exactly 1 minute', function () {
            expect(Moovie.Util.formatTime(60)).toEqual('1:00');
        });

        it('should handle seconds over 1 minute and less than 10 seconds', function () {
            expect(Moovie.Util.formatTime(63)).toEqual('1:03');
        });

        it('should handle seconds over 1 minute and over 10 seconds', function () {
            expect(Moovie.Util.formatTime(71)).toEqual('1:11');
        });

        it('should handle seconds over 10 minutes', function () {
            expect(Moovie.Util.formatTime(600)).toEqual('10:00');
        });

        it('should handle seconds equal to exactly 60 minutes', function () {
            expect(Moovie.Util.formatTime(3600)).toEqual('1:00:00');
        });
    });
});