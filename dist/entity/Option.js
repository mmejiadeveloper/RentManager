"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var State_1 = require("./State");
var Location_1 = require("./Location");
var Option = /** @class */ (function () {
    function Option() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Option.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ width: 100, type: String }),
        __metadata("design:type", String)
    ], Option.prototype, "link", void 0);
    __decorate([
        typeorm_1.Column({ width: 50, type: String }),
        __metadata("design:type", String)
    ], Option.prototype, "adress", void 0);
    __decorate([
        typeorm_1.Column({ width: 20, type: String }),
        __metadata("design:type", String)
    ], Option.prototype, "contact", void 0);
    __decorate([
        typeorm_1.Column({ width: 1, type: Number }),
        __metadata("design:type", Number)
    ], Option.prototype, "checked", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return State_1.State; }, function (state) { return state.option; }),
        __metadata("design:type", State_1.State)
    ], Option.prototype, "state", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Location_1.Location; }, function (location) { return location.option; }),
        __metadata("design:type", Location_1.Location)
    ], Option.prototype, "location", void 0);
    __decorate([
        typeorm_1.Column({ width: 250, type: String }),
        __metadata("design:type", String)
    ], Option.prototype, "notes", void 0);
    __decorate([
        typeorm_1.Column({ width: 2, type: String }),
        __metadata("design:type", String)
    ], Option.prototype, "doesLike", void 0);
    Option = __decorate([
        typeorm_1.Entity()
    ], Option);
    return Option;
}());
exports.Option = Option;
//# sourceMappingURL=Option.js.map