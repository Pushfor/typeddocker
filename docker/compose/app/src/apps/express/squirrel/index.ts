// Shameless copy of https://github.com/aluxian/squirrel-updates-server
import * as debug from "debug";
import { Request, Response } from "express";
import * as semver from "semver";
import * as url from "url";

const logger = debug("typeddocker.squirrel");

const DATABASE = {
    darwin: {
        update: {
            "0.9.0": {
                url: undefined,
            },
            "1.0.0": {
            name: "1.0, 0",
            notes: "### Notable Changes\r\n\r\n* Fixed a bug that caused...",
            pub_date: "2016-02-02T21:51:58Z",
            url: "https://s3-eu-west-1.amazonaws.com/pushfor-desktop-builds/typeddocker/typeddocker-1.0.0.osx.zip",
        },
    },
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

    const bestMatch = bestVersion(version, Object.keys(DATABASE[platform].update));

    logger("best match", bestMatch, "for version", version, "on platform", platform);

    if (bestMatch === null) {
        response.status(204).end();
        return;
    }
    logger("response", JSON.stringify(DATABASE[platform][bestMatch]));
    response.send(JSON.stringify(DATABASE[platform].update[bestMatch]));

}

/**
 * Gets newest version
 * @param {string} version
 * @param {string} platform
 */
export function bestVersion(version: string, versions: string[]): string {
    const filteredVersions = versions
        .filter((versionNumber: string) => versionNumber === version || semver.gt(versionNumber, version))
        .sort((a: string, b: string) => {
            if (a === b) {
                return 0;
            }
            return semver.lt(a, b) ? 1 : -1;
        });
    if (filteredVersions.length === 0) {
        return null;
    }
    return filteredVersions[0];
}
