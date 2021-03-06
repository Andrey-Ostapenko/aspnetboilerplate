﻿declare namespace abp {

    let appPath: string;

    let pageLoadTime: Date;

    function toAbsAppPath(path: string): string;

    namespace localization {

        interface ILanguageInfo {

            name: string;

            displayName: string;

            icon: string;

            isDefault: boolean;

        }

        interface ILocalizationSource {

            name: string;

            type: string;

        }

        let languages: ILanguageInfo[];

        let currentLanguage: ILanguageInfo;

        let sources: ILocalizationSource[];

        let defaultSourceName: string;

        let values: any;

        let abpWeb: (key: string) => string;

        function localize(key: string, sourceName: string): string;

        function getSource(sourceName: string): (key: string) => string;

        function isCurrentCulture(name: string): boolean;
    }

    namespace auth {

        let allPermissions: any;

        let grantedPermissions: any;

        function isGranted(permissionName: string): boolean;

        function isAnyGranted(...args: string[]): boolean;

        function areAllGranted(...args: string[]): boolean;

    }

    namespace features {

        interface IFeature {

            value: string;

        }

        let allFeatures: any;

        function get(name: string): IFeature;

        function getValue(name: string): string;

        function isEnabled(name: string): boolean;

    }

    namespace settings {

        let values: any;

        function get(name: string): string;

        function getBoolean(name: string): boolean;

        function getInt(name: string): number;

    }

    namespace notifications {

        enum severity {
            INFO,
            SUCCESS,
            WARN,
            ERROR,
            FATAL
        }

        enum userNotificationState {
            UNREAD,
            READ
        }

        //TODO: We can extend this interface to define built-in notification types, like ILocalizableMessageNotificationData 
        interface INotificationData {

            type: string;

            properties: any;
        }

        interface INotification {

            id: string;

            notificationName: string;

            severity: severity;

            entityType?: any;

            entityTypeName?: string;

            entityId?: any;

            data: INotificationData;

            creationTime: Date;

        }

        interface IUserNotification {

            id: string;

            userId: number;

            state: userNotificationState;

            notification: INotification;
        }

        let messageFormatters: any;

        function getUserNotificationStateAsString(userNotificationState: userNotificationState): string;

        function getUiNotifyFuncBySeverity(severity: severity): (message: string, title?: string, options?: any) => void;

        function getFormattedMessageFromUserNotification(userNotification: IUserNotification): string;

        function showUiNotifyForUserNotification(userNotification: IUserNotification, options?: any): void;

    }

    namespace log {

        enum levels {
            DEBUG,
            INFO,
            WARN,
            ERROR,
            FATAL
        }

        let level: levels;

        function log(logObject?: any, logLevel?: levels): void;

        function debug(logObject?: any): void;

        function info(logObject?: any): void;

        function warn(logObject?: any): void;

        function error(logObject?: any): void;

        function fatal(logObject?: any): void;

    }

    namespace notify {

        function info(message: string, title?: string, options?: any): void;

        function success(message: string, title?: string, options?: any): void;

        function warn(message: string, title?: string, options?: any): void;

        function error(message: string, title?: string, options?: any): void;

    }

    namespace message {

        //TODO: these methods return jQuery.Promise instead of any. fix it.

        function info(message: string, title?: string): any;

        function success(message: string, title?: string): any;

        function warn(message: string, title?: string): any;

        function error(message: string, title?: string): any;

        function confirm(message: string, callback?: (result: boolean) => void): any;

        function confirm(message: string, title?: string, callback?: (result: boolean) => void): any;

    }

    namespace ui {

        function block(elm?: any): void;

        function unblock(elm?: any): void;

        function setBusy(elm?: any, optionsOrPromise?: any): void;

        function clearBusy(elm?: any): void;

    }

    namespace event {

        function on(eventName: string, callback: (...args: any[]) => void): void;

        function off(eventName: string, callback: (...args: any[]) => void): void;

        function trigger(eventName: string): void;

    }

    interface INameValue {
        name: string;
        value?: any;
    }

    namespace utils {

        function createNamespace(root: any, ns: string): any;

        function replaceAll(str: string, search: string, replacement: any): string;

        function formatString(str: string, ...args: any[]): string;

        function toPascalCase(str: string): string;

        function toCamelCase(str: string): string;

        function truncateString(str: string, maxLength: number): string;

        function truncateStringWithPostfix(str: string, maxLength: number, postfix: string): string;

        function isFunction(obj: any): boolean;

        function buildQueryString(parameterInfos: INameValue[], includeQuestionMark?: boolean): string;

        /**
        * Sets a cookie value for given key.
        * @param {string} key
        * @param {string} value 
        * @param {Date} expireDate Optional expire date (default: 30 days).
        */
        function setCookieValue(key: string, value: string, expireDate?: Date): void;

        /**
        * Gets a cookie with given key.
        * @param {string} key
        * @returns {string} Cookie value
        */
        function getCookieValue(key: string): string;
    }

    namespace timing {

        interface IClockProvider {

            now(): Date;

            normalize(date: Date): Date;

        }

        const utcClockProvider: IClockProvider;

        const localClockProvider: IClockProvider;

        const unspecifiedClockProvider: IClockProvider;

        function convertToUserTimezone(date: Date): Date;

    }

    namespace clock {

        function now(): Date;

        function normalize(date: Date): Date;

        let provider: timing.IClockProvider;

    }

    namespace security {

        namespace antiForgery {

            let tokenCookieName: string;

            let tokenHeaderName: string;

            function getToken(): string;
        }

    }

}