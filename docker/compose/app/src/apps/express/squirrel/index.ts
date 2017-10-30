import { Request, Response } from "express";
import * as semver from "semver";
import * as url from "url";

const DATABASE = {
    darwin: {
        "0.9.0": "fuff",
        "1.0.0": "https://s3-eu-west-1.amazonaws.com/pushfor-desktop-builds/angular.svg",
    },
};

/**
 * GET /update/darwin?version=x.x.x
 * @param request
 * @param response
 */
export function update(request: Request, response: Response): void {

    const version = request.query.version;
    const platform = request.param("platform");

    if (!version) {
        response.status(400);
        response.send({
            error: "Version is undefined",
        });
        return;
    }

    response.send({
        name: "1.4.3",
        notes: "### Notable Changes\r\n\r\n* Fixed a bug that caused...",
        pub_date: "2016-02-02T21:51:58Z",
        url: "https://github.com/atom/atom/releases/download/v1.4.3/atom-mac.zip",
    });

}

/**
 * Gets newest version
 * @param {string} version
 * @param {string} platform
 */
export function bestVersion(version: string, platform: string): string {
    const versions: string[] = Object
        .keys(DATABASE[platform])
        .filter((versionNumber: string) => versionNumber === version || semver.gt(versionNumber, version))
        .sort((a: string, b: string) => {
            if (a === b) {
                return 0;
            }
            return semver.lt(a, b) ? 1 : -1;
        });
    if (versions.length === 0) {
        return null;
    }
    return versions[0];
}
