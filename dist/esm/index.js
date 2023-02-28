export class Cookie {
    constructor(_name, _value) {
        this._name = _name;
        this._value = _value;
        this._secure = true;
        this._httpOnly = true;
        this._sameSite = SameSite.Lax;
    }
    get name() {
        return this._name;
    }
    get value() {
        return this._value;
    }
    get expires() {
        return this._expires;
    }
    get maxAge() {
        return this._maxAge;
    }
    get domain() {
        return this._domain;
    }
    get path() {
        return this._path;
    }
    get secure() {
        return this._secure;
    }
    get httpOnly() {
        return this._httpOnly;
    }
    get sameSite() {
        return this._sameSite;
    }
    /**
     * Sets the cookie's name.
     * @param name
     * @returns The `Cookie` instance.
     */
    setName(name) {
        this._name = name;
        return this;
    }
    /**
     * Sets the cookie's value.
     * @param value
     * @returns The `Cookie` instance.
     */
    setValue(value) {
        this._value = value;
        return this;
    }
    /**
     * Sets the cookie's `Expires` attribute.
     * If provided a `Date` object, it will be converted to a UTC string.
     * @param date A `Date` object or a UTC date string.
     * @returns The `Cookie` instance.
     */
    setExpires(date) {
        this._expires = date instanceof Date ? date.toUTCString() : date;
        return this;
    }
    /**
     * Sets the cookie's `Max-Age` attribute.
     * @param maxAge The maximum age, in seconds.
     * @returns The `Cookie` instance.
     */
    setMaxAge(maxAge) {
        this._maxAge = maxAge;
        return this;
    }
    /**
     * Sets the cookie's `Domain` attribute.
     * @param domain
     * @returns The `Cookie` instance.
     */
    setDomain(domain) {
        this._domain = domain;
        return this;
    }
    /**
     * Sets the cookie's `Path` attribute.
     * @param path
     * @returns The `Cookie` instance.
     */
    setPath(path) {
        this._path = path;
        return this;
    }
    /**
     * Sets the cookie's `Secure` attribute.
     * @param secure `true` to include the `Secure` attribute; `false` to exclude it. Each new `Cookie` instance defaults to `true`.
     * @returns The `Cookie` instance.
     */
    setSecure(secure) {
        if (this._sameSite === SameSite.None && !secure) {
            throw new CookieError('Secure context required: A cookie with "SameSite=None" must include "Secure".');
        }
        this._secure = secure;
        return this;
    }
    /**
     * Sets the cookie's `HttpOnly` attribute.
     * @param httpOnly `true` to include the `HttpOnly` attribute; `false` to exclude it. Each new `Cookie` instance defaults to `true`.
     * @returns The `Cookie` instance.
     */
    setHttpOnly(httpOnly) {
        this._httpOnly = httpOnly;
        return this;
    }
    /**
     * Sets the cookie's `SameSite` attribute.
     * @param sameSite One of "Strict", "Lax", or "None".
     * If set to "None", `Secure` will be set to `true` because such cookies require a secure context.
     * @returns The `Cookie` instance.
     */
    setSameSite(sameSite) {
        this._sameSite = sameSite;
        if (sameSite === SameSite.None) {
            // Cookies w/ SameSite=None require a secure context
            this._secure = true;
        }
        return this;
    }
    /**
     * Returns the `Cookie` instance as a string ready to use in a `Set-Cookie` header.
     * @returns The `Cookie` as a string.
     */
    toString() {
        let cookie = `${this.name}=${this.value}; SameSite=${this.sameSite}`;
        if (this.domain)
            cookie += `; Domain=${this.domain}`;
        if (this.path)
            cookie += `; Path=${this.path}`;
        if (this.httpOnly)
            cookie += `; HttpOnly`;
        if (this.secure)
            cookie += `; Secure`;
        if (this.maxAge)
            cookie += `; Max-Age=${this.maxAge}`;
        if (this.expires)
            cookie += `; Expires=${this.expires}`;
        return cookie;
    }
    /**
     * Parses a cookie string into a new `Cookie` instance.
     * When using this method, `Secure` and `HttpOnly` are _not_ enabled unless they
     * are enabled in the cookie string. In keeping with browser behavior, if the string
     * does not include a `SameSite` attribute, a default of "Lax" will be applied to the
     * new `Cookie` instance.
     * @param cookieStr A cookie string from a `Set-Cookie` header.
     * @returns A new `Cookie` instance.
     */
    static parse(cookieStr) {
        const cookieArr = cookieStr.split("; ").map((attr) => attr.split("="));
        const cookieObj = Object.fromEntries(cookieArr);
        const cookieAttrs = Object.keys(cookieObj);
        const cookie = new Cookie("", "").setHttpOnly(false).setSecure(false);
        cookieAttrs.forEach((attr) => {
            switch (attr.toLowerCase()) {
                case "samesite":
                    cookie.setSameSite(cookieObj[attr]);
                    break;
                case "domain":
                    cookie.setDomain(String(cookieObj[attr]));
                    break;
                case "path":
                    cookie.setPath(String(cookieObj[attr]));
                    break;
                case "httponly":
                    cookie.setHttpOnly(true);
                    break;
                case "secure":
                    cookie.setSecure(true);
                    break;
                case "max-age":
                    cookie.setMaxAge(Number(cookieObj[attr]));
                    break;
                case "expires":
                    cookie.setExpires(String(cookieObj[attr]));
                    break;
                default:
                    cookie.setName(attr);
                    cookie.setValue(String(cookieObj[attr]));
            }
        });
        return cookie;
    }
}
export var SameSite;
(function (SameSite) {
    SameSite["Strict"] = "Strict";
    SameSite["Lax"] = "Lax";
    SameSite["None"] = "None";
})(SameSite || (SameSite = {}));
export class CookieError extends Error {
    constructor() {
        super(...arguments);
        this.name = "CookieError";
    }
}
