/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

/* For reference read the Jasmine and Sinon docs
 * Jasmine docs: https://jasmine.github.io/
 * Sinon docs: http://sinonjs.org/docs/
 */

import Utils from '../../../../media/js/glean/utils.es6';

describe('utilsjs', function () {
    describe('getPathFromUrl', function () {
        it('should return the path from a page URL excluding locale', function () {
            expect(Utils.getPathFromUrl('/en-US/firefox/new/')).toEqual(
                '/firefox/new/'
            );
            expect(Utils.getPathFromUrl('/de/firefox/new/')).toEqual(
                '/firefox/new/'
            );
            expect(Utils.getPathFromUrl('/kab/firefox/new/')).toEqual(
                '/firefox/new/'
            );
            expect(Utils.getPathFromUrl('/fr/')).toEqual('/');
        });

        it('should return original path when there is no locale', function () {
            expect(Utils.getPathFromUrl('/locales/')).toEqual('/locales/');
        });
    });

    describe('getLocaleFromUrl', function () {
        it('should return the locale from a page URL excluding path', function () {
            expect(Utils.getLocaleFromUrl('/en-US/firefox/new/')).toEqual(
                'en-US'
            );
            expect(Utils.getLocaleFromUrl('/de/firefox/new/')).toEqual('de');
            expect(Utils.getLocaleFromUrl('/kab/firefox/new/')).toEqual('kab');
            expect(Utils.getLocaleFromUrl('/fr/')).toEqual('fr');
        });

        it('should return `en-US` for language when there is no locale', function () {
            expect(Utils.getLocaleFromUrl('/locales/')).toEqual('en-US');
        });
    });

    describe('getQueryParamsFromURL', function () {
        it('should return an object made up of params from a query string', function () {
            const query =
                'utm_source=test-source&utm_campaign=test-campaign&utm_medium=test-medium&utm_content=test-content&entrypoint_experiment=test_entrypoint_experiment&entrypoint_variation=1&experiment=test-experiment&variation=1&v=1&xv=test-xv';

            expect(Utils.getQueryParamsFromURL(query).params).toEqual({
                utm_source: 'test-source',
                utm_campaign: 'test-campaign',
                utm_medium: 'test-medium',
                utm_content: 'test-content',
                entrypoint_experiment: 'test_entrypoint_experiment',
                entrypoint_variation: 1,
                experiment: 'test-experiment',
                variation: 1,
                v: 1,
                xv: 'test-xv'
            });
        });
    });

    describe('isTelemetryEnabled', function () {
        it('should return true if opt out cookie does not exist', function () {
            spyOn(Mozilla.Cookies, 'hasItem').and.returnValue(false);
            const result = Utils.isTelemetryEnabled();
            expect(Mozilla.Cookies.hasItem).toHaveBeenCalledWith(
                'moz-1st-party-data-opt-out'
            );
            expect(result).toBeTrue();
        });

        it('should return false if opt out cookie exists', function () {
            spyOn(Mozilla.Cookies, 'hasItem').and.returnValue(true);
            const result = Utils.isTelemetryEnabled();
            expect(Mozilla.Cookies.hasItem).toHaveBeenCalledWith(
                'moz-1st-party-data-opt-out'
            );
            expect(result).toBeFalse();
        });
    });
});
