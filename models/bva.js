const Component = require('../models/component');
const conf=require('../config/data.json');

class BVA {
    constructor() {
        this.components = [];
        this.combinations = [];
        this.versions = [];
        this.times_called = 0;
        this.v_components = [];
        this.allComponents=this._init();
        

    }
    async _init() {
        var versions = conf.versions;
        var components = []
        var component = await Component.find();
        component.forEach(element => {
            components.push(element.name)
        });
        this.components = components
        this.versions = versions

        components.forEach(element => {
            this.v_components.push(versions.slice(0))
        });
        this.combinations = this.generateCombinations();
        return component;
    }
    getNewVersion() {
        var lng = this.combinations.length;

        var versions = [];
        var vers;
        if (this.times_called < lng) {
            versions = this.combinations[this.times_called]
        } else {
            versions = [];
            for (let i = 0; i < this.components.length; i++) {
                vers = this.randomVersion(i);
                versions.push(vers)
            }
        }
        this.times_called++;

        return versions;
    }
    randomVersion(component) {
        if (this.v_components[component] == 0) {
            this.v_components[component] = this.versions.slice(0);
        }
        var versions_component = this.v_components[component];
        var version = versions_component[(component + this.times_called) % versions_component.length]

        var num = versions_component.indexOf(version)

        versions_component.splice(num, 1);
        return version;
    }

    generateCombinations() {
        var combinations = [];
        var nComponents = this.components.length;
        const [head, ...rest] = this.versions
        var goodVersion = head;
        var nonGoodVersion = rest;
        var times_iterated = 0;

        while (nComponents > times_iterated) {
            var count = nComponents - times_iterated;

            var good_Version = new Array(nComponents);
            var bad_Version = new Array(nComponents)
            for (let i = 0; i < nComponents; i++) {
                if (i < count) {

                    good_Version[i] = goodVersion;
                    bad_Version[i] = this.randomBadVersions(i, times_iterated, nonGoodVersion)
                } else {
                    good_Version[i] = this.randomBadVersions(i, times_iterated, nonGoodVersion)
                    bad_Version[i] = goodVersion
                }
            }
            combinations.push(good_Version);
            combinations.push(bad_Version);
            times_iterated++;
        }
        return combinations;
    }

    randomBadVersions(component, count, nonGoodVersion) {
        var versions_component = this.v_components[component];
        var num = versions_component.indexOf('1')
        if (num != -1) {
            versions_component.splice(num, 1);
        }
        if (versions_component.length == 0) {
            this.v_components[component] = this.versions.slice(0);
            versions_component = this.v_components[component];
            var num1 = versions_component.indexOf('1')
            if (num1 != -1) {
                versions_component.splice(num1, 1);
            }
        }
        var bad_versions = nonGoodVersion;
        var version = bad_versions[(count + component) % bad_versions.length];
        var upgrade = this.v_components[component]
        var num2 = upgrade.indexOf(version)
        upgrade.splice(num2, 1);
        return version

    }
}
module.exports.BVA = BVA;