"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const boulders_route_1 = __importDefault(require("./routes/gym/boulders.route"));
const app = (0, express_1.default)();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        mongoose_1.default.set('strictQuery', false);
        yield mongoose_1.default.connect("mongodb://127.0.0.1:27017/BoulderApp");
        console.log(`connected to db`);
    });
}
main().catch(err => console.log(err));
app.use(express_1.default.json());
app.use("/boulders", boulders_route_1.default);
app.use((err, req, res, next) => {
    res.status(500).render("error", { err });
});
app.listen('3000', () => {
    console.log(`Listening on port 3000, Url: http://localhost:3000`);
});
//# sourceMappingURL=app.js.map