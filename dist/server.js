"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dbConnection_1 = __importDefault(require("./config/dbConnection"));
const corsOptions_1 = __importDefault(require("./config/corsOptions"));
const credentials_1 = __importDefault(require("./middleware/credentials"));
const register_1 = __importDefault(require("./routes/register"));
const auth_1 = __importDefault(require("./routes/auth"));
const refresh_1 = __importDefault(require("./routes/refresh"));
const logout_1 = __importDefault(require("./routes/logout"));
// dotenv.config({ path: __dirname + '/.env' });
const PORT = process.env.PORT || 8080;
// connect to DB
(0, dbConnection_1.default)('');
const app = (0, express_1.default)();
app.use(credentials_1.default);
app.use((0, cors_1.default)((0, corsOptions_1.default)()));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
// routing
app.use('/register', register_1.default);
app.use('/auth', auth_1.default);
app.use('/refresh', refresh_1.default);
app.use('/logout', logout_1.default);
app.all('*', (req, res) => {
    res.status(404).send(); // TODO: deal with 404
});
// error logging
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
