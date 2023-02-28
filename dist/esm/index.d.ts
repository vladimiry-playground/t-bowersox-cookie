export declare class Cookie {
    private _name;
    private _value;
    get name(): string;
    get value(): string;
    private _expires?;
    get expires(): string | undefined;
    private _maxAge?;
    get maxAge(): number | undefined;
    private _domain?;
    get domain(): string | undefined;
    private _path?;
    get path(): string | undefined;
    private _secure;
    get secure(): boolean;
    private _httpOnly;
    get httpOnly(): boolean;
    private _sameSite;
    get sameSite(): SameSite;
    constructor(_name: string, _value: string);
    /**
     * Sets the cookie's name.
     * @param name
     * @returns The `Cookie` instance.
     */
    setName(name: string): Cookie;
    /**
     * Sets the cookie's value.
     * @param value
     * @returns The `Cookie` instance.
     */
    setValue(value: string): Cookie;
    /**
     * Sets the cookie's `Expires` attribute.
     * If provided a `Date` object, it will be converted to a UTC string.
     * @param date A `Date` object or a UTC date string.
     * @returns The `Cookie` instance.
     */
    setExpires(date: Date | string): Cookie;
    /**
     * Sets the cookie's `Max-Age` attribute.
     * @param maxAge The maximum age, in seconds.
     * @returns The `Cookie` instance.
     */
    setMaxAge(maxAge: number): Cookie;
    /**
     * Sets the cookie's `Domain` attribute.
     * @param domain
     * @returns The `Cookie` instance.
     */
    setDomain(domain: string): Cookie;
    /**
     * Sets the cookie's `Path` attribute.
     * @param path
     * @returns The `Cookie` instance.
     */
    setPath(path: string): Cookie;
    /**
     * Sets the cookie's `Secure` attribute.
     * @param secure `true` to include the `Secure` attribute; `false` to exclude it. Each new `Cookie` instance defaults to `true`.
     * @returns The `Cookie` instance.
     */
    setSecure(secure: boolean): Cookie;
    /**
     * Sets the cookie's `HttpOnly` attribute.
     * @param httpOnly `true` to include the `HttpOnly` attribute; `false` to exclude it. Each new `Cookie` instance defaults to `true`.
     * @returns The `Cookie` instance.
     */
    setHttpOnly(httpOnly: boolean): Cookie;
    /**
     * Sets the cookie's `SameSite` attribute.
     * @param sameSite One of "Strict", "Lax", or "None".
     * If set to "None", `Secure` will be set to `true` because such cookies require a secure context.
     * @returns The `Cookie` instance.
     */
    setSameSite(sameSite: SameSite): Cookie;
    /**
     * Returns the `Cookie` instance as a string ready to use in a `Set-Cookie` header.
     * @returns The `Cookie` as a string.
     */
    toString(): string;
    /**
     * Parses a cookie string into a new `Cookie` instance.
     * When using this method, `Secure` and `HttpOnly` are _not_ enabled unless they
     * are enabled in the cookie string. In keeping with browser behavior, if the string
     * does not include a `SameSite` attribute, a default of "Lax" will be applied to the
     * new `Cookie` instance.
     * @param cookieStr A cookie string from a `Set-Cookie` header.
     * @returns A new `Cookie` instance.
     */
    static parse(cookieStr: string): Cookie;
}
export declare enum SameSite {
    Strict = "Strict",
    Lax = "Lax",
    None = "None"
}
export declare class CookieError extends Error {
    name: string;
}
//# sourceMappingURL=index.d.ts.map