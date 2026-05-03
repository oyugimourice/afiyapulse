
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Patient
 * 
 */
export type Patient = $Result.DefaultSelection<Prisma.$PatientPayload>
/**
 * Model Consultation
 * 
 */
export type Consultation = $Result.DefaultSelection<Prisma.$ConsultationPayload>
/**
 * Model Transcript
 * 
 */
export type Transcript = $Result.DefaultSelection<Prisma.$TranscriptPayload>
/**
 * Model SOAPNote
 * 
 */
export type SOAPNote = $Result.DefaultSelection<Prisma.$SOAPNotePayload>
/**
 * Model Prescription
 * 
 */
export type Prescription = $Result.DefaultSelection<Prisma.$PrescriptionPayload>
/**
 * Model Referral
 * 
 */
export type Referral = $Result.DefaultSelection<Prisma.$ReferralPayload>
/**
 * Model Appointment
 * 
 */
export type Appointment = $Result.DefaultSelection<Prisma.$AppointmentPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  DOCTOR: 'DOCTOR',
  NURSE: 'NURSE',
  ADMIN: 'ADMIN'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const Gender: {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER',
  UNKNOWN: 'UNKNOWN'
};

export type Gender = (typeof Gender)[keyof typeof Gender]


export const ConsultationStatus: {
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  PENDING_REVIEW: 'PENDING_REVIEW'
};

export type ConsultationStatus = (typeof ConsultationStatus)[keyof typeof ConsultationStatus]


export const Speaker: {
  DOCTOR: 'DOCTOR',
  PATIENT: 'PATIENT',
  SYSTEM: 'SYSTEM'
};

export type Speaker = (typeof Speaker)[keyof typeof Speaker]


export const Urgency: {
  ROUTINE: 'ROUTINE',
  URGENT: 'URGENT',
  EMERGENCY: 'EMERGENCY'
};

export type Urgency = (typeof Urgency)[keyof typeof Urgency]


export const AppointmentType: {
  FOLLOW_UP: 'FOLLOW_UP',
  LAB_WORK: 'LAB_WORK',
  IMAGING: 'IMAGING',
  SPECIALIST: 'SPECIALIST',
  PROCEDURE: 'PROCEDURE'
};

export type AppointmentType = (typeof AppointmentType)[keyof typeof AppointmentType]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type Gender = $Enums.Gender

export const Gender: typeof $Enums.Gender

export type ConsultationStatus = $Enums.ConsultationStatus

export const ConsultationStatus: typeof $Enums.ConsultationStatus

export type Speaker = $Enums.Speaker

export const Speaker: typeof $Enums.Speaker

export type Urgency = $Enums.Urgency

export const Urgency: typeof $Enums.Urgency

export type AppointmentType = $Enums.AppointmentType

export const AppointmentType: typeof $Enums.AppointmentType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.patient`: Exposes CRUD operations for the **Patient** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Patients
    * const patients = await prisma.patient.findMany()
    * ```
    */
  get patient(): Prisma.PatientDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.consultation`: Exposes CRUD operations for the **Consultation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Consultations
    * const consultations = await prisma.consultation.findMany()
    * ```
    */
  get consultation(): Prisma.ConsultationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transcript`: Exposes CRUD operations for the **Transcript** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transcripts
    * const transcripts = await prisma.transcript.findMany()
    * ```
    */
  get transcript(): Prisma.TranscriptDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sOAPNote`: Exposes CRUD operations for the **SOAPNote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SOAPNotes
    * const sOAPNotes = await prisma.sOAPNote.findMany()
    * ```
    */
  get sOAPNote(): Prisma.SOAPNoteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.prescription`: Exposes CRUD operations for the **Prescription** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Prescriptions
    * const prescriptions = await prisma.prescription.findMany()
    * ```
    */
  get prescription(): Prisma.PrescriptionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.referral`: Exposes CRUD operations for the **Referral** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Referrals
    * const referrals = await prisma.referral.findMany()
    * ```
    */
  get referral(): Prisma.ReferralDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.appointment`: Exposes CRUD operations for the **Appointment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Appointments
    * const appointments = await prisma.appointment.findMany()
    * ```
    */
  get appointment(): Prisma.AppointmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Patient: 'Patient',
    Consultation: 'Consultation',
    Transcript: 'Transcript',
    SOAPNote: 'SOAPNote',
    Prescription: 'Prescription',
    Referral: 'Referral',
    Appointment: 'Appointment',
    AuditLog: 'AuditLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "patient" | "consultation" | "transcript" | "sOAPNote" | "prescription" | "referral" | "appointment" | "auditLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Patient: {
        payload: Prisma.$PatientPayload<ExtArgs>
        fields: Prisma.PatientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PatientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PatientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          findFirst: {
            args: Prisma.PatientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PatientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          findMany: {
            args: Prisma.PatientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>[]
          }
          create: {
            args: Prisma.PatientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          createMany: {
            args: Prisma.PatientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PatientCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>[]
          }
          delete: {
            args: Prisma.PatientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          update: {
            args: Prisma.PatientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          deleteMany: {
            args: Prisma.PatientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PatientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PatientUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>[]
          }
          upsert: {
            args: Prisma.PatientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          aggregate: {
            args: Prisma.PatientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePatient>
          }
          groupBy: {
            args: Prisma.PatientGroupByArgs<ExtArgs>
            result: $Utils.Optional<PatientGroupByOutputType>[]
          }
          count: {
            args: Prisma.PatientCountArgs<ExtArgs>
            result: $Utils.Optional<PatientCountAggregateOutputType> | number
          }
        }
      }
      Consultation: {
        payload: Prisma.$ConsultationPayload<ExtArgs>
        fields: Prisma.ConsultationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConsultationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConsultationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>
          }
          findFirst: {
            args: Prisma.ConsultationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConsultationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>
          }
          findMany: {
            args: Prisma.ConsultationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>[]
          }
          create: {
            args: Prisma.ConsultationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>
          }
          createMany: {
            args: Prisma.ConsultationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConsultationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>[]
          }
          delete: {
            args: Prisma.ConsultationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>
          }
          update: {
            args: Prisma.ConsultationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>
          }
          deleteMany: {
            args: Prisma.ConsultationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConsultationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConsultationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>[]
          }
          upsert: {
            args: Prisma.ConsultationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>
          }
          aggregate: {
            args: Prisma.ConsultationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConsultation>
          }
          groupBy: {
            args: Prisma.ConsultationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConsultationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConsultationCountArgs<ExtArgs>
            result: $Utils.Optional<ConsultationCountAggregateOutputType> | number
          }
        }
      }
      Transcript: {
        payload: Prisma.$TranscriptPayload<ExtArgs>
        fields: Prisma.TranscriptFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TranscriptFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TranscriptPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TranscriptFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TranscriptPayload>
          }
          findFirst: {
            args: Prisma.TranscriptFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TranscriptPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TranscriptFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TranscriptPayload>
          }
          findMany: {
            args: Prisma.TranscriptFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TranscriptPayload>[]
          }
          create: {
            args: Prisma.TranscriptCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TranscriptPayload>
          }
          createMany: {
            args: Prisma.TranscriptCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TranscriptCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TranscriptPayload>[]
          }
          delete: {
            args: Prisma.TranscriptDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TranscriptPayload>
          }
          update: {
            args: Prisma.TranscriptUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TranscriptPayload>
          }
          deleteMany: {
            args: Prisma.TranscriptDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TranscriptUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TranscriptUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TranscriptPayload>[]
          }
          upsert: {
            args: Prisma.TranscriptUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TranscriptPayload>
          }
          aggregate: {
            args: Prisma.TranscriptAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTranscript>
          }
          groupBy: {
            args: Prisma.TranscriptGroupByArgs<ExtArgs>
            result: $Utils.Optional<TranscriptGroupByOutputType>[]
          }
          count: {
            args: Prisma.TranscriptCountArgs<ExtArgs>
            result: $Utils.Optional<TranscriptCountAggregateOutputType> | number
          }
        }
      }
      SOAPNote: {
        payload: Prisma.$SOAPNotePayload<ExtArgs>
        fields: Prisma.SOAPNoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SOAPNoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SOAPNotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SOAPNoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SOAPNotePayload>
          }
          findFirst: {
            args: Prisma.SOAPNoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SOAPNotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SOAPNoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SOAPNotePayload>
          }
          findMany: {
            args: Prisma.SOAPNoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SOAPNotePayload>[]
          }
          create: {
            args: Prisma.SOAPNoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SOAPNotePayload>
          }
          createMany: {
            args: Prisma.SOAPNoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SOAPNoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SOAPNotePayload>[]
          }
          delete: {
            args: Prisma.SOAPNoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SOAPNotePayload>
          }
          update: {
            args: Prisma.SOAPNoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SOAPNotePayload>
          }
          deleteMany: {
            args: Prisma.SOAPNoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SOAPNoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SOAPNoteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SOAPNotePayload>[]
          }
          upsert: {
            args: Prisma.SOAPNoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SOAPNotePayload>
          }
          aggregate: {
            args: Prisma.SOAPNoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSOAPNote>
          }
          groupBy: {
            args: Prisma.SOAPNoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<SOAPNoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.SOAPNoteCountArgs<ExtArgs>
            result: $Utils.Optional<SOAPNoteCountAggregateOutputType> | number
          }
        }
      }
      Prescription: {
        payload: Prisma.$PrescriptionPayload<ExtArgs>
        fields: Prisma.PrescriptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PrescriptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PrescriptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>
          }
          findFirst: {
            args: Prisma.PrescriptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PrescriptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>
          }
          findMany: {
            args: Prisma.PrescriptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>[]
          }
          create: {
            args: Prisma.PrescriptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>
          }
          createMany: {
            args: Prisma.PrescriptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PrescriptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>[]
          }
          delete: {
            args: Prisma.PrescriptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>
          }
          update: {
            args: Prisma.PrescriptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>
          }
          deleteMany: {
            args: Prisma.PrescriptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PrescriptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PrescriptionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>[]
          }
          upsert: {
            args: Prisma.PrescriptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>
          }
          aggregate: {
            args: Prisma.PrescriptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePrescription>
          }
          groupBy: {
            args: Prisma.PrescriptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<PrescriptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.PrescriptionCountArgs<ExtArgs>
            result: $Utils.Optional<PrescriptionCountAggregateOutputType> | number
          }
        }
      }
      Referral: {
        payload: Prisma.$ReferralPayload<ExtArgs>
        fields: Prisma.ReferralFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReferralFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReferralFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralPayload>
          }
          findFirst: {
            args: Prisma.ReferralFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReferralFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralPayload>
          }
          findMany: {
            args: Prisma.ReferralFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralPayload>[]
          }
          create: {
            args: Prisma.ReferralCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralPayload>
          }
          createMany: {
            args: Prisma.ReferralCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReferralCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralPayload>[]
          }
          delete: {
            args: Prisma.ReferralDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralPayload>
          }
          update: {
            args: Prisma.ReferralUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralPayload>
          }
          deleteMany: {
            args: Prisma.ReferralDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReferralUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReferralUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralPayload>[]
          }
          upsert: {
            args: Prisma.ReferralUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralPayload>
          }
          aggregate: {
            args: Prisma.ReferralAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReferral>
          }
          groupBy: {
            args: Prisma.ReferralGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReferralGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReferralCountArgs<ExtArgs>
            result: $Utils.Optional<ReferralCountAggregateOutputType> | number
          }
        }
      }
      Appointment: {
        payload: Prisma.$AppointmentPayload<ExtArgs>
        fields: Prisma.AppointmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AppointmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AppointmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findFirst: {
            args: Prisma.AppointmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AppointmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findMany: {
            args: Prisma.AppointmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          create: {
            args: Prisma.AppointmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          createMany: {
            args: Prisma.AppointmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AppointmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          delete: {
            args: Prisma.AppointmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          update: {
            args: Prisma.AppointmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          deleteMany: {
            args: Prisma.AppointmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AppointmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AppointmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          upsert: {
            args: Prisma.AppointmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          aggregate: {
            args: Prisma.AppointmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAppointment>
          }
          groupBy: {
            args: Prisma.AppointmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppointmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AppointmentCountArgs<ExtArgs>
            result: $Utils.Optional<AppointmentCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    patient?: PatientOmit
    consultation?: ConsultationOmit
    transcript?: TranscriptOmit
    sOAPNote?: SOAPNoteOmit
    prescription?: PrescriptionOmit
    referral?: ReferralOmit
    appointment?: AppointmentOmit
    auditLog?: AuditLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    consultations: number
    auditLogs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consultations?: boolean | UserCountOutputTypeCountConsultationsArgs
    auditLogs?: boolean | UserCountOutputTypeCountAuditLogsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountConsultationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConsultationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * Count Type PatientCountOutputType
   */

  export type PatientCountOutputType = {
    consultations: number
    prescriptions: number
    referrals: number
    appointments: number
  }

  export type PatientCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consultations?: boolean | PatientCountOutputTypeCountConsultationsArgs
    prescriptions?: boolean | PatientCountOutputTypeCountPrescriptionsArgs
    referrals?: boolean | PatientCountOutputTypeCountReferralsArgs
    appointments?: boolean | PatientCountOutputTypeCountAppointmentsArgs
  }

  // Custom InputTypes
  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientCountOutputType
     */
    select?: PatientCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeCountConsultationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConsultationWhereInput
  }

  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeCountPrescriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PrescriptionWhereInput
  }

  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeCountReferralsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReferralWhereInput
  }

  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeCountAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
  }


  /**
   * Count Type ConsultationCountOutputType
   */

  export type ConsultationCountOutputType = {
    transcripts: number
  }

  export type ConsultationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transcripts?: boolean | ConsultationCountOutputTypeCountTranscriptsArgs
  }

  // Custom InputTypes
  /**
   * ConsultationCountOutputType without action
   */
  export type ConsultationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsultationCountOutputType
     */
    select?: ConsultationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ConsultationCountOutputType without action
   */
  export type ConsultationCountOutputTypeCountTranscriptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TranscriptWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    passwordHash: string | null
    role: $Enums.UserRole | null
    specialty: string | null
    licenseNumber: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    passwordHash: string | null
    role: $Enums.UserRole | null
    specialty: string | null
    licenseNumber: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    passwordHash: number
    role: number
    specialty: number
    licenseNumber: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    passwordHash?: true
    role?: true
    specialty?: true
    licenseNumber?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    passwordHash?: true
    role?: true
    specialty?: true
    licenseNumber?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    passwordHash?: true
    role?: true
    specialty?: true
    licenseNumber?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string
    passwordHash: string
    role: $Enums.UserRole
    specialty: string | null
    licenseNumber: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    passwordHash?: boolean
    role?: boolean
    specialty?: boolean
    licenseNumber?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    consultations?: boolean | User$consultationsArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    passwordHash?: boolean
    role?: boolean
    specialty?: boolean
    licenseNumber?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    passwordHash?: boolean
    role?: boolean
    specialty?: boolean
    licenseNumber?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    passwordHash?: boolean
    role?: boolean
    specialty?: boolean
    licenseNumber?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "passwordHash" | "role" | "specialty" | "licenseNumber" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consultations?: boolean | User$consultationsArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      consultations: Prisma.$ConsultationPayload<ExtArgs>[]
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string
      passwordHash: string
      role: $Enums.UserRole
      specialty: string | null
      licenseNumber: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    consultations<T extends User$consultationsArgs<ExtArgs> = {}>(args?: Subset<T, User$consultationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    auditLogs<T extends User$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly specialty: FieldRef<"User", 'String'>
    readonly licenseNumber: FieldRef<"User", 'String'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.consultations
   */
  export type User$consultationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    where?: ConsultationWhereInput
    orderBy?: ConsultationOrderByWithRelationInput | ConsultationOrderByWithRelationInput[]
    cursor?: ConsultationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConsultationScalarFieldEnum | ConsultationScalarFieldEnum[]
  }

  /**
   * User.auditLogs
   */
  export type User$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Patient
   */

  export type AggregatePatient = {
    _count: PatientCountAggregateOutputType | null
    _min: PatientMinAggregateOutputType | null
    _max: PatientMaxAggregateOutputType | null
  }

  export type PatientMinAggregateOutputType = {
    id: string | null
    mrn: string | null
    firstName: string | null
    lastName: string | null
    dob: Date | null
    gender: $Enums.Gender | null
    phone: string | null
    email: string | null
    address: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PatientMaxAggregateOutputType = {
    id: string | null
    mrn: string | null
    firstName: string | null
    lastName: string | null
    dob: Date | null
    gender: $Enums.Gender | null
    phone: string | null
    email: string | null
    address: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PatientCountAggregateOutputType = {
    id: number
    mrn: number
    firstName: number
    lastName: number
    dob: number
    gender: number
    phone: number
    email: number
    address: number
    allergies: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PatientMinAggregateInputType = {
    id?: true
    mrn?: true
    firstName?: true
    lastName?: true
    dob?: true
    gender?: true
    phone?: true
    email?: true
    address?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PatientMaxAggregateInputType = {
    id?: true
    mrn?: true
    firstName?: true
    lastName?: true
    dob?: true
    gender?: true
    phone?: true
    email?: true
    address?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PatientCountAggregateInputType = {
    id?: true
    mrn?: true
    firstName?: true
    lastName?: true
    dob?: true
    gender?: true
    phone?: true
    email?: true
    address?: true
    allergies?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PatientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Patient to aggregate.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Patients
    **/
    _count?: true | PatientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PatientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PatientMaxAggregateInputType
  }

  export type GetPatientAggregateType<T extends PatientAggregateArgs> = {
        [P in keyof T & keyof AggregatePatient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePatient[P]>
      : GetScalarType<T[P], AggregatePatient[P]>
  }




  export type PatientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatientWhereInput
    orderBy?: PatientOrderByWithAggregationInput | PatientOrderByWithAggregationInput[]
    by: PatientScalarFieldEnum[] | PatientScalarFieldEnum
    having?: PatientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PatientCountAggregateInputType | true
    _min?: PatientMinAggregateInputType
    _max?: PatientMaxAggregateInputType
  }

  export type PatientGroupByOutputType = {
    id: string
    mrn: string
    firstName: string
    lastName: string
    dob: Date
    gender: $Enums.Gender
    phone: string | null
    email: string | null
    address: string | null
    allergies: string[]
    createdAt: Date
    updatedAt: Date
    _count: PatientCountAggregateOutputType | null
    _min: PatientMinAggregateOutputType | null
    _max: PatientMaxAggregateOutputType | null
  }

  type GetPatientGroupByPayload<T extends PatientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PatientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PatientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PatientGroupByOutputType[P]>
            : GetScalarType<T[P], PatientGroupByOutputType[P]>
        }
      >
    >


  export type PatientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mrn?: boolean
    firstName?: boolean
    lastName?: boolean
    dob?: boolean
    gender?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    allergies?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    consultations?: boolean | Patient$consultationsArgs<ExtArgs>
    prescriptions?: boolean | Patient$prescriptionsArgs<ExtArgs>
    referrals?: boolean | Patient$referralsArgs<ExtArgs>
    appointments?: boolean | Patient$appointmentsArgs<ExtArgs>
    _count?: boolean | PatientCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patient"]>

  export type PatientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mrn?: boolean
    firstName?: boolean
    lastName?: boolean
    dob?: boolean
    gender?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    allergies?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["patient"]>

  export type PatientSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mrn?: boolean
    firstName?: boolean
    lastName?: boolean
    dob?: boolean
    gender?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    allergies?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["patient"]>

  export type PatientSelectScalar = {
    id?: boolean
    mrn?: boolean
    firstName?: boolean
    lastName?: boolean
    dob?: boolean
    gender?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    allergies?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PatientOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "mrn" | "firstName" | "lastName" | "dob" | "gender" | "phone" | "email" | "address" | "allergies" | "createdAt" | "updatedAt", ExtArgs["result"]["patient"]>
  export type PatientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consultations?: boolean | Patient$consultationsArgs<ExtArgs>
    prescriptions?: boolean | Patient$prescriptionsArgs<ExtArgs>
    referrals?: boolean | Patient$referralsArgs<ExtArgs>
    appointments?: boolean | Patient$appointmentsArgs<ExtArgs>
    _count?: boolean | PatientCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PatientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PatientIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PatientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Patient"
    objects: {
      consultations: Prisma.$ConsultationPayload<ExtArgs>[]
      prescriptions: Prisma.$PrescriptionPayload<ExtArgs>[]
      referrals: Prisma.$ReferralPayload<ExtArgs>[]
      appointments: Prisma.$AppointmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      mrn: string
      firstName: string
      lastName: string
      dob: Date
      gender: $Enums.Gender
      phone: string | null
      email: string | null
      address: string | null
      allergies: string[]
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["patient"]>
    composites: {}
  }

  type PatientGetPayload<S extends boolean | null | undefined | PatientDefaultArgs> = $Result.GetResult<Prisma.$PatientPayload, S>

  type PatientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PatientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PatientCountAggregateInputType | true
    }

  export interface PatientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Patient'], meta: { name: 'Patient' } }
    /**
     * Find zero or one Patient that matches the filter.
     * @param {PatientFindUniqueArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PatientFindUniqueArgs>(args: SelectSubset<T, PatientFindUniqueArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Patient that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PatientFindUniqueOrThrowArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PatientFindUniqueOrThrowArgs>(args: SelectSubset<T, PatientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Patient that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindFirstArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PatientFindFirstArgs>(args?: SelectSubset<T, PatientFindFirstArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Patient that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindFirstOrThrowArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PatientFindFirstOrThrowArgs>(args?: SelectSubset<T, PatientFindFirstOrThrowArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Patients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Patients
     * const patients = await prisma.patient.findMany()
     * 
     * // Get first 10 Patients
     * const patients = await prisma.patient.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const patientWithIdOnly = await prisma.patient.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PatientFindManyArgs>(args?: SelectSubset<T, PatientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Patient.
     * @param {PatientCreateArgs} args - Arguments to create a Patient.
     * @example
     * // Create one Patient
     * const Patient = await prisma.patient.create({
     *   data: {
     *     // ... data to create a Patient
     *   }
     * })
     * 
     */
    create<T extends PatientCreateArgs>(args: SelectSubset<T, PatientCreateArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Patients.
     * @param {PatientCreateManyArgs} args - Arguments to create many Patients.
     * @example
     * // Create many Patients
     * const patient = await prisma.patient.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PatientCreateManyArgs>(args?: SelectSubset<T, PatientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Patients and returns the data saved in the database.
     * @param {PatientCreateManyAndReturnArgs} args - Arguments to create many Patients.
     * @example
     * // Create many Patients
     * const patient = await prisma.patient.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Patients and only return the `id`
     * const patientWithIdOnly = await prisma.patient.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PatientCreateManyAndReturnArgs>(args?: SelectSubset<T, PatientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Patient.
     * @param {PatientDeleteArgs} args - Arguments to delete one Patient.
     * @example
     * // Delete one Patient
     * const Patient = await prisma.patient.delete({
     *   where: {
     *     // ... filter to delete one Patient
     *   }
     * })
     * 
     */
    delete<T extends PatientDeleteArgs>(args: SelectSubset<T, PatientDeleteArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Patient.
     * @param {PatientUpdateArgs} args - Arguments to update one Patient.
     * @example
     * // Update one Patient
     * const patient = await prisma.patient.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PatientUpdateArgs>(args: SelectSubset<T, PatientUpdateArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Patients.
     * @param {PatientDeleteManyArgs} args - Arguments to filter Patients to delete.
     * @example
     * // Delete a few Patients
     * const { count } = await prisma.patient.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PatientDeleteManyArgs>(args?: SelectSubset<T, PatientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Patients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Patients
     * const patient = await prisma.patient.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PatientUpdateManyArgs>(args: SelectSubset<T, PatientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Patients and returns the data updated in the database.
     * @param {PatientUpdateManyAndReturnArgs} args - Arguments to update many Patients.
     * @example
     * // Update many Patients
     * const patient = await prisma.patient.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Patients and only return the `id`
     * const patientWithIdOnly = await prisma.patient.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PatientUpdateManyAndReturnArgs>(args: SelectSubset<T, PatientUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Patient.
     * @param {PatientUpsertArgs} args - Arguments to update or create a Patient.
     * @example
     * // Update or create a Patient
     * const patient = await prisma.patient.upsert({
     *   create: {
     *     // ... data to create a Patient
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Patient we want to update
     *   }
     * })
     */
    upsert<T extends PatientUpsertArgs>(args: SelectSubset<T, PatientUpsertArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Patients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientCountArgs} args - Arguments to filter Patients to count.
     * @example
     * // Count the number of Patients
     * const count = await prisma.patient.count({
     *   where: {
     *     // ... the filter for the Patients we want to count
     *   }
     * })
    **/
    count<T extends PatientCountArgs>(
      args?: Subset<T, PatientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PatientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Patient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PatientAggregateArgs>(args: Subset<T, PatientAggregateArgs>): Prisma.PrismaPromise<GetPatientAggregateType<T>>

    /**
     * Group by Patient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PatientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PatientGroupByArgs['orderBy'] }
        : { orderBy?: PatientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PatientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Patient model
   */
  readonly fields: PatientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Patient.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PatientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    consultations<T extends Patient$consultationsArgs<ExtArgs> = {}>(args?: Subset<T, Patient$consultationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    prescriptions<T extends Patient$prescriptionsArgs<ExtArgs> = {}>(args?: Subset<T, Patient$prescriptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    referrals<T extends Patient$referralsArgs<ExtArgs> = {}>(args?: Subset<T, Patient$referralsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReferralPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    appointments<T extends Patient$appointmentsArgs<ExtArgs> = {}>(args?: Subset<T, Patient$appointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Patient model
   */
  interface PatientFieldRefs {
    readonly id: FieldRef<"Patient", 'String'>
    readonly mrn: FieldRef<"Patient", 'String'>
    readonly firstName: FieldRef<"Patient", 'String'>
    readonly lastName: FieldRef<"Patient", 'String'>
    readonly dob: FieldRef<"Patient", 'DateTime'>
    readonly gender: FieldRef<"Patient", 'Gender'>
    readonly phone: FieldRef<"Patient", 'String'>
    readonly email: FieldRef<"Patient", 'String'>
    readonly address: FieldRef<"Patient", 'String'>
    readonly allergies: FieldRef<"Patient", 'String[]'>
    readonly createdAt: FieldRef<"Patient", 'DateTime'>
    readonly updatedAt: FieldRef<"Patient", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Patient findUnique
   */
  export type PatientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient findUniqueOrThrow
   */
  export type PatientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient findFirst
   */
  export type PatientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Patients.
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Patients.
     */
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Patient findFirstOrThrow
   */
  export type PatientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Patients.
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Patients.
     */
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Patient findMany
   */
  export type PatientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patients to fetch.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Patients.
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Patients.
     */
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Patient create
   */
  export type PatientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * The data needed to create a Patient.
     */
    data: XOR<PatientCreateInput, PatientUncheckedCreateInput>
  }

  /**
   * Patient createMany
   */
  export type PatientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Patients.
     */
    data: PatientCreateManyInput | PatientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Patient createManyAndReturn
   */
  export type PatientCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * The data used to create many Patients.
     */
    data: PatientCreateManyInput | PatientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Patient update
   */
  export type PatientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * The data needed to update a Patient.
     */
    data: XOR<PatientUpdateInput, PatientUncheckedUpdateInput>
    /**
     * Choose, which Patient to update.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient updateMany
   */
  export type PatientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Patients.
     */
    data: XOR<PatientUpdateManyMutationInput, PatientUncheckedUpdateManyInput>
    /**
     * Filter which Patients to update
     */
    where?: PatientWhereInput
    /**
     * Limit how many Patients to update.
     */
    limit?: number
  }

  /**
   * Patient updateManyAndReturn
   */
  export type PatientUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * The data used to update Patients.
     */
    data: XOR<PatientUpdateManyMutationInput, PatientUncheckedUpdateManyInput>
    /**
     * Filter which Patients to update
     */
    where?: PatientWhereInput
    /**
     * Limit how many Patients to update.
     */
    limit?: number
  }

  /**
   * Patient upsert
   */
  export type PatientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * The filter to search for the Patient to update in case it exists.
     */
    where: PatientWhereUniqueInput
    /**
     * In case the Patient found by the `where` argument doesn't exist, create a new Patient with this data.
     */
    create: XOR<PatientCreateInput, PatientUncheckedCreateInput>
    /**
     * In case the Patient was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PatientUpdateInput, PatientUncheckedUpdateInput>
  }

  /**
   * Patient delete
   */
  export type PatientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter which Patient to delete.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient deleteMany
   */
  export type PatientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Patients to delete
     */
    where?: PatientWhereInput
    /**
     * Limit how many Patients to delete.
     */
    limit?: number
  }

  /**
   * Patient.consultations
   */
  export type Patient$consultationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    where?: ConsultationWhereInput
    orderBy?: ConsultationOrderByWithRelationInput | ConsultationOrderByWithRelationInput[]
    cursor?: ConsultationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConsultationScalarFieldEnum | ConsultationScalarFieldEnum[]
  }

  /**
   * Patient.prescriptions
   */
  export type Patient$prescriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    where?: PrescriptionWhereInput
    orderBy?: PrescriptionOrderByWithRelationInput | PrescriptionOrderByWithRelationInput[]
    cursor?: PrescriptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PrescriptionScalarFieldEnum | PrescriptionScalarFieldEnum[]
  }

  /**
   * Patient.referrals
   */
  export type Patient$referralsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Referral
     */
    omit?: ReferralOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null
    where?: ReferralWhereInput
    orderBy?: ReferralOrderByWithRelationInput | ReferralOrderByWithRelationInput[]
    cursor?: ReferralWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReferralScalarFieldEnum | ReferralScalarFieldEnum[]
  }

  /**
   * Patient.appointments
   */
  export type Patient$appointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    cursor?: AppointmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Patient without action
   */
  export type PatientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
  }


  /**
   * Model Consultation
   */

  export type AggregateConsultation = {
    _count: ConsultationCountAggregateOutputType | null
    _avg: ConsultationAvgAggregateOutputType | null
    _sum: ConsultationSumAggregateOutputType | null
    _min: ConsultationMinAggregateOutputType | null
    _max: ConsultationMaxAggregateOutputType | null
  }

  export type ConsultationAvgAggregateOutputType = {
    duration: number | null
  }

  export type ConsultationSumAggregateOutputType = {
    duration: number | null
  }

  export type ConsultationMinAggregateOutputType = {
    id: string | null
    patientId: string | null
    doctorId: string | null
    startedAt: Date | null
    endedAt: Date | null
    status: $Enums.ConsultationStatus | null
    audioUrl: string | null
    duration: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConsultationMaxAggregateOutputType = {
    id: string | null
    patientId: string | null
    doctorId: string | null
    startedAt: Date | null
    endedAt: Date | null
    status: $Enums.ConsultationStatus | null
    audioUrl: string | null
    duration: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConsultationCountAggregateOutputType = {
    id: number
    patientId: number
    doctorId: number
    startedAt: number
    endedAt: number
    status: number
    audioUrl: number
    duration: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ConsultationAvgAggregateInputType = {
    duration?: true
  }

  export type ConsultationSumAggregateInputType = {
    duration?: true
  }

  export type ConsultationMinAggregateInputType = {
    id?: true
    patientId?: true
    doctorId?: true
    startedAt?: true
    endedAt?: true
    status?: true
    audioUrl?: true
    duration?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConsultationMaxAggregateInputType = {
    id?: true
    patientId?: true
    doctorId?: true
    startedAt?: true
    endedAt?: true
    status?: true
    audioUrl?: true
    duration?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConsultationCountAggregateInputType = {
    id?: true
    patientId?: true
    doctorId?: true
    startedAt?: true
    endedAt?: true
    status?: true
    audioUrl?: true
    duration?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ConsultationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Consultation to aggregate.
     */
    where?: ConsultationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Consultations to fetch.
     */
    orderBy?: ConsultationOrderByWithRelationInput | ConsultationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConsultationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Consultations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Consultations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Consultations
    **/
    _count?: true | ConsultationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ConsultationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ConsultationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConsultationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConsultationMaxAggregateInputType
  }

  export type GetConsultationAggregateType<T extends ConsultationAggregateArgs> = {
        [P in keyof T & keyof AggregateConsultation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConsultation[P]>
      : GetScalarType<T[P], AggregateConsultation[P]>
  }




  export type ConsultationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConsultationWhereInput
    orderBy?: ConsultationOrderByWithAggregationInput | ConsultationOrderByWithAggregationInput[]
    by: ConsultationScalarFieldEnum[] | ConsultationScalarFieldEnum
    having?: ConsultationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConsultationCountAggregateInputType | true
    _avg?: ConsultationAvgAggregateInputType
    _sum?: ConsultationSumAggregateInputType
    _min?: ConsultationMinAggregateInputType
    _max?: ConsultationMaxAggregateInputType
  }

  export type ConsultationGroupByOutputType = {
    id: string
    patientId: string
    doctorId: string
    startedAt: Date
    endedAt: Date | null
    status: $Enums.ConsultationStatus
    audioUrl: string | null
    duration: number | null
    createdAt: Date
    updatedAt: Date
    _count: ConsultationCountAggregateOutputType | null
    _avg: ConsultationAvgAggregateOutputType | null
    _sum: ConsultationSumAggregateOutputType | null
    _min: ConsultationMinAggregateOutputType | null
    _max: ConsultationMaxAggregateOutputType | null
  }

  type GetConsultationGroupByPayload<T extends ConsultationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConsultationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConsultationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConsultationGroupByOutputType[P]>
            : GetScalarType<T[P], ConsultationGroupByOutputType[P]>
        }
      >
    >


  export type ConsultationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientId?: boolean
    doctorId?: boolean
    startedAt?: boolean
    endedAt?: boolean
    status?: boolean
    audioUrl?: boolean
    duration?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    doctor?: boolean | UserDefaultArgs<ExtArgs>
    transcripts?: boolean | Consultation$transcriptsArgs<ExtArgs>
    soapNote?: boolean | Consultation$soapNoteArgs<ExtArgs>
    prescription?: boolean | Consultation$prescriptionArgs<ExtArgs>
    referral?: boolean | Consultation$referralArgs<ExtArgs>
    appointment?: boolean | Consultation$appointmentArgs<ExtArgs>
    _count?: boolean | ConsultationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["consultation"]>

  export type ConsultationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientId?: boolean
    doctorId?: boolean
    startedAt?: boolean
    endedAt?: boolean
    status?: boolean
    audioUrl?: boolean
    duration?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    doctor?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["consultation"]>

  export type ConsultationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientId?: boolean
    doctorId?: boolean
    startedAt?: boolean
    endedAt?: boolean
    status?: boolean
    audioUrl?: boolean
    duration?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    doctor?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["consultation"]>

  export type ConsultationSelectScalar = {
    id?: boolean
    patientId?: boolean
    doctorId?: boolean
    startedAt?: boolean
    endedAt?: boolean
    status?: boolean
    audioUrl?: boolean
    duration?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ConsultationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "patientId" | "doctorId" | "startedAt" | "endedAt" | "status" | "audioUrl" | "duration" | "createdAt" | "updatedAt", ExtArgs["result"]["consultation"]>
  export type ConsultationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    doctor?: boolean | UserDefaultArgs<ExtArgs>
    transcripts?: boolean | Consultation$transcriptsArgs<ExtArgs>
    soapNote?: boolean | Consultation$soapNoteArgs<ExtArgs>
    prescription?: boolean | Consultation$prescriptionArgs<ExtArgs>
    referral?: boolean | Consultation$referralArgs<ExtArgs>
    appointment?: boolean | Consultation$appointmentArgs<ExtArgs>
    _count?: boolean | ConsultationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ConsultationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    doctor?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ConsultationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    doctor?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ConsultationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Consultation"
    objects: {
      patient: Prisma.$PatientPayload<ExtArgs>
      doctor: Prisma.$UserPayload<ExtArgs>
      transcripts: Prisma.$TranscriptPayload<ExtArgs>[]
      soapNote: Prisma.$SOAPNotePayload<ExtArgs> | null
      prescription: Prisma.$PrescriptionPayload<ExtArgs> | null
      referral: Prisma.$ReferralPayload<ExtArgs> | null
      appointment: Prisma.$AppointmentPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      patientId: string
      doctorId: string
      startedAt: Date
      endedAt: Date | null
      status: $Enums.ConsultationStatus
      audioUrl: string | null
      duration: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["consultation"]>
    composites: {}
  }

  type ConsultationGetPayload<S extends boolean | null | undefined | ConsultationDefaultArgs> = $Result.GetResult<Prisma.$ConsultationPayload, S>

  type ConsultationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConsultationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConsultationCountAggregateInputType | true
    }

  export interface ConsultationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Consultation'], meta: { name: 'Consultation' } }
    /**
     * Find zero or one Consultation that matches the filter.
     * @param {ConsultationFindUniqueArgs} args - Arguments to find a Consultation
     * @example
     * // Get one Consultation
     * const consultation = await prisma.consultation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConsultationFindUniqueArgs>(args: SelectSubset<T, ConsultationFindUniqueArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Consultation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConsultationFindUniqueOrThrowArgs} args - Arguments to find a Consultation
     * @example
     * // Get one Consultation
     * const consultation = await prisma.consultation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConsultationFindUniqueOrThrowArgs>(args: SelectSubset<T, ConsultationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Consultation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationFindFirstArgs} args - Arguments to find a Consultation
     * @example
     * // Get one Consultation
     * const consultation = await prisma.consultation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConsultationFindFirstArgs>(args?: SelectSubset<T, ConsultationFindFirstArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Consultation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationFindFirstOrThrowArgs} args - Arguments to find a Consultation
     * @example
     * // Get one Consultation
     * const consultation = await prisma.consultation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConsultationFindFirstOrThrowArgs>(args?: SelectSubset<T, ConsultationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Consultations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Consultations
     * const consultations = await prisma.consultation.findMany()
     * 
     * // Get first 10 Consultations
     * const consultations = await prisma.consultation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const consultationWithIdOnly = await prisma.consultation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConsultationFindManyArgs>(args?: SelectSubset<T, ConsultationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Consultation.
     * @param {ConsultationCreateArgs} args - Arguments to create a Consultation.
     * @example
     * // Create one Consultation
     * const Consultation = await prisma.consultation.create({
     *   data: {
     *     // ... data to create a Consultation
     *   }
     * })
     * 
     */
    create<T extends ConsultationCreateArgs>(args: SelectSubset<T, ConsultationCreateArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Consultations.
     * @param {ConsultationCreateManyArgs} args - Arguments to create many Consultations.
     * @example
     * // Create many Consultations
     * const consultation = await prisma.consultation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConsultationCreateManyArgs>(args?: SelectSubset<T, ConsultationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Consultations and returns the data saved in the database.
     * @param {ConsultationCreateManyAndReturnArgs} args - Arguments to create many Consultations.
     * @example
     * // Create many Consultations
     * const consultation = await prisma.consultation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Consultations and only return the `id`
     * const consultationWithIdOnly = await prisma.consultation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConsultationCreateManyAndReturnArgs>(args?: SelectSubset<T, ConsultationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Consultation.
     * @param {ConsultationDeleteArgs} args - Arguments to delete one Consultation.
     * @example
     * // Delete one Consultation
     * const Consultation = await prisma.consultation.delete({
     *   where: {
     *     // ... filter to delete one Consultation
     *   }
     * })
     * 
     */
    delete<T extends ConsultationDeleteArgs>(args: SelectSubset<T, ConsultationDeleteArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Consultation.
     * @param {ConsultationUpdateArgs} args - Arguments to update one Consultation.
     * @example
     * // Update one Consultation
     * const consultation = await prisma.consultation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConsultationUpdateArgs>(args: SelectSubset<T, ConsultationUpdateArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Consultations.
     * @param {ConsultationDeleteManyArgs} args - Arguments to filter Consultations to delete.
     * @example
     * // Delete a few Consultations
     * const { count } = await prisma.consultation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConsultationDeleteManyArgs>(args?: SelectSubset<T, ConsultationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Consultations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Consultations
     * const consultation = await prisma.consultation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConsultationUpdateManyArgs>(args: SelectSubset<T, ConsultationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Consultations and returns the data updated in the database.
     * @param {ConsultationUpdateManyAndReturnArgs} args - Arguments to update many Consultations.
     * @example
     * // Update many Consultations
     * const consultation = await prisma.consultation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Consultations and only return the `id`
     * const consultationWithIdOnly = await prisma.consultation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ConsultationUpdateManyAndReturnArgs>(args: SelectSubset<T, ConsultationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Consultation.
     * @param {ConsultationUpsertArgs} args - Arguments to update or create a Consultation.
     * @example
     * // Update or create a Consultation
     * const consultation = await prisma.consultation.upsert({
     *   create: {
     *     // ... data to create a Consultation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Consultation we want to update
     *   }
     * })
     */
    upsert<T extends ConsultationUpsertArgs>(args: SelectSubset<T, ConsultationUpsertArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Consultations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationCountArgs} args - Arguments to filter Consultations to count.
     * @example
     * // Count the number of Consultations
     * const count = await prisma.consultation.count({
     *   where: {
     *     // ... the filter for the Consultations we want to count
     *   }
     * })
    **/
    count<T extends ConsultationCountArgs>(
      args?: Subset<T, ConsultationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConsultationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Consultation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConsultationAggregateArgs>(args: Subset<T, ConsultationAggregateArgs>): Prisma.PrismaPromise<GetConsultationAggregateType<T>>

    /**
     * Group by Consultation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConsultationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConsultationGroupByArgs['orderBy'] }
        : { orderBy?: ConsultationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConsultationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConsultationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Consultation model
   */
  readonly fields: ConsultationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Consultation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConsultationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patient<T extends PatientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatientDefaultArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    doctor<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    transcripts<T extends Consultation$transcriptsArgs<ExtArgs> = {}>(args?: Subset<T, Consultation$transcriptsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TranscriptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    soapNote<T extends Consultation$soapNoteArgs<ExtArgs> = {}>(args?: Subset<T, Consultation$soapNoteArgs<ExtArgs>>): Prisma__SOAPNoteClient<$Result.GetResult<Prisma.$SOAPNotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    prescription<T extends Consultation$prescriptionArgs<ExtArgs> = {}>(args?: Subset<T, Consultation$prescriptionArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    referral<T extends Consultation$referralArgs<ExtArgs> = {}>(args?: Subset<T, Consultation$referralArgs<ExtArgs>>): Prisma__ReferralClient<$Result.GetResult<Prisma.$ReferralPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    appointment<T extends Consultation$appointmentArgs<ExtArgs> = {}>(args?: Subset<T, Consultation$appointmentArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Consultation model
   */
  interface ConsultationFieldRefs {
    readonly id: FieldRef<"Consultation", 'String'>
    readonly patientId: FieldRef<"Consultation", 'String'>
    readonly doctorId: FieldRef<"Consultation", 'String'>
    readonly startedAt: FieldRef<"Consultation", 'DateTime'>
    readonly endedAt: FieldRef<"Consultation", 'DateTime'>
    readonly status: FieldRef<"Consultation", 'ConsultationStatus'>
    readonly audioUrl: FieldRef<"Consultation", 'String'>
    readonly duration: FieldRef<"Consultation", 'Int'>
    readonly createdAt: FieldRef<"Consultation", 'DateTime'>
    readonly updatedAt: FieldRef<"Consultation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Consultation findUnique
   */
  export type ConsultationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * Filter, which Consultation to fetch.
     */
    where: ConsultationWhereUniqueInput
  }

  /**
   * Consultation findUniqueOrThrow
   */
  export type ConsultationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * Filter, which Consultation to fetch.
     */
    where: ConsultationWhereUniqueInput
  }

  /**
   * Consultation findFirst
   */
  export type ConsultationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * Filter, which Consultation to fetch.
     */
    where?: ConsultationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Consultations to fetch.
     */
    orderBy?: ConsultationOrderByWithRelationInput | ConsultationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Consultations.
     */
    cursor?: ConsultationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Consultations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Consultations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Consultations.
     */
    distinct?: ConsultationScalarFieldEnum | ConsultationScalarFieldEnum[]
  }

  /**
   * Consultation findFirstOrThrow
   */
  export type ConsultationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * Filter, which Consultation to fetch.
     */
    where?: ConsultationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Consultations to fetch.
     */
    orderBy?: ConsultationOrderByWithRelationInput | ConsultationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Consultations.
     */
    cursor?: ConsultationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Consultations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Consultations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Consultations.
     */
    distinct?: ConsultationScalarFieldEnum | ConsultationScalarFieldEnum[]
  }

  /**
   * Consultation findMany
   */
  export type ConsultationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * Filter, which Consultations to fetch.
     */
    where?: ConsultationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Consultations to fetch.
     */
    orderBy?: ConsultationOrderByWithRelationInput | ConsultationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Consultations.
     */
    cursor?: ConsultationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Consultations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Consultations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Consultations.
     */
    distinct?: ConsultationScalarFieldEnum | ConsultationScalarFieldEnum[]
  }

  /**
   * Consultation create
   */
  export type ConsultationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * The data needed to create a Consultation.
     */
    data: XOR<ConsultationCreateInput, ConsultationUncheckedCreateInput>
  }

  /**
   * Consultation createMany
   */
  export type ConsultationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Consultations.
     */
    data: ConsultationCreateManyInput | ConsultationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Consultation createManyAndReturn
   */
  export type ConsultationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * The data used to create many Consultations.
     */
    data: ConsultationCreateManyInput | ConsultationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Consultation update
   */
  export type ConsultationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * The data needed to update a Consultation.
     */
    data: XOR<ConsultationUpdateInput, ConsultationUncheckedUpdateInput>
    /**
     * Choose, which Consultation to update.
     */
    where: ConsultationWhereUniqueInput
  }

  /**
   * Consultation updateMany
   */
  export type ConsultationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Consultations.
     */
    data: XOR<ConsultationUpdateManyMutationInput, ConsultationUncheckedUpdateManyInput>
    /**
     * Filter which Consultations to update
     */
    where?: ConsultationWhereInput
    /**
     * Limit how many Consultations to update.
     */
    limit?: number
  }

  /**
   * Consultation updateManyAndReturn
   */
  export type ConsultationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * The data used to update Consultations.
     */
    data: XOR<ConsultationUpdateManyMutationInput, ConsultationUncheckedUpdateManyInput>
    /**
     * Filter which Consultations to update
     */
    where?: ConsultationWhereInput
    /**
     * Limit how many Consultations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Consultation upsert
   */
  export type ConsultationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * The filter to search for the Consultation to update in case it exists.
     */
    where: ConsultationWhereUniqueInput
    /**
     * In case the Consultation found by the `where` argument doesn't exist, create a new Consultation with this data.
     */
    create: XOR<ConsultationCreateInput, ConsultationUncheckedCreateInput>
    /**
     * In case the Consultation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConsultationUpdateInput, ConsultationUncheckedUpdateInput>
  }

  /**
   * Consultation delete
   */
  export type ConsultationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * Filter which Consultation to delete.
     */
    where: ConsultationWhereUniqueInput
  }

  /**
   * Consultation deleteMany
   */
  export type ConsultationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Consultations to delete
     */
    where?: ConsultationWhereInput
    /**
     * Limit how many Consultations to delete.
     */
    limit?: number
  }

  /**
   * Consultation.transcripts
   */
  export type Consultation$transcriptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transcript
     */
    select?: TranscriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transcript
     */
    omit?: TranscriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranscriptInclude<ExtArgs> | null
    where?: TranscriptWhereInput
    orderBy?: TranscriptOrderByWithRelationInput | TranscriptOrderByWithRelationInput[]
    cursor?: TranscriptWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TranscriptScalarFieldEnum | TranscriptScalarFieldEnum[]
  }

  /**
   * Consultation.soapNote
   */
  export type Consultation$soapNoteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SOAPNote
     */
    select?: SOAPNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SOAPNote
     */
    omit?: SOAPNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SOAPNoteInclude<ExtArgs> | null
    where?: SOAPNoteWhereInput
  }

  /**
   * Consultation.prescription
   */
  export type Consultation$prescriptionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    where?: PrescriptionWhereInput
  }

  /**
   * Consultation.referral
   */
  export type Consultation$referralArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Referral
     */
    omit?: ReferralOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null
    where?: ReferralWhereInput
  }

  /**
   * Consultation.appointment
   */
  export type Consultation$appointmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
  }

  /**
   * Consultation without action
   */
  export type ConsultationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
  }


  /**
   * Model Transcript
   */

  export type AggregateTranscript = {
    _count: TranscriptCountAggregateOutputType | null
    _avg: TranscriptAvgAggregateOutputType | null
    _sum: TranscriptSumAggregateOutputType | null
    _min: TranscriptMinAggregateOutputType | null
    _max: TranscriptMaxAggregateOutputType | null
  }

  export type TranscriptAvgAggregateOutputType = {
    confidence: number | null
  }

  export type TranscriptSumAggregateOutputType = {
    confidence: number | null
  }

  export type TranscriptMinAggregateOutputType = {
    id: string | null
    consultationId: string | null
    text: string | null
    speaker: $Enums.Speaker | null
    timestamp: Date | null
    confidence: number | null
  }

  export type TranscriptMaxAggregateOutputType = {
    id: string | null
    consultationId: string | null
    text: string | null
    speaker: $Enums.Speaker | null
    timestamp: Date | null
    confidence: number | null
  }

  export type TranscriptCountAggregateOutputType = {
    id: number
    consultationId: number
    text: number
    speaker: number
    timestamp: number
    confidence: number
    _all: number
  }


  export type TranscriptAvgAggregateInputType = {
    confidence?: true
  }

  export type TranscriptSumAggregateInputType = {
    confidence?: true
  }

  export type TranscriptMinAggregateInputType = {
    id?: true
    consultationId?: true
    text?: true
    speaker?: true
    timestamp?: true
    confidence?: true
  }

  export type TranscriptMaxAggregateInputType = {
    id?: true
    consultationId?: true
    text?: true
    speaker?: true
    timestamp?: true
    confidence?: true
  }

  export type TranscriptCountAggregateInputType = {
    id?: true
    consultationId?: true
    text?: true
    speaker?: true
    timestamp?: true
    confidence?: true
    _all?: true
  }

  export type TranscriptAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transcript to aggregate.
     */
    where?: TranscriptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transcripts to fetch.
     */
    orderBy?: TranscriptOrderByWithRelationInput | TranscriptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TranscriptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transcripts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transcripts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transcripts
    **/
    _count?: true | TranscriptCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TranscriptAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TranscriptSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TranscriptMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TranscriptMaxAggregateInputType
  }

  export type GetTranscriptAggregateType<T extends TranscriptAggregateArgs> = {
        [P in keyof T & keyof AggregateTranscript]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTranscript[P]>
      : GetScalarType<T[P], AggregateTranscript[P]>
  }




  export type TranscriptGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TranscriptWhereInput
    orderBy?: TranscriptOrderByWithAggregationInput | TranscriptOrderByWithAggregationInput[]
    by: TranscriptScalarFieldEnum[] | TranscriptScalarFieldEnum
    having?: TranscriptScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TranscriptCountAggregateInputType | true
    _avg?: TranscriptAvgAggregateInputType
    _sum?: TranscriptSumAggregateInputType
    _min?: TranscriptMinAggregateInputType
    _max?: TranscriptMaxAggregateInputType
  }

  export type TranscriptGroupByOutputType = {
    id: string
    consultationId: string
    text: string
    speaker: $Enums.Speaker
    timestamp: Date
    confidence: number | null
    _count: TranscriptCountAggregateOutputType | null
    _avg: TranscriptAvgAggregateOutputType | null
    _sum: TranscriptSumAggregateOutputType | null
    _min: TranscriptMinAggregateOutputType | null
    _max: TranscriptMaxAggregateOutputType | null
  }

  type GetTranscriptGroupByPayload<T extends TranscriptGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TranscriptGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TranscriptGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TranscriptGroupByOutputType[P]>
            : GetScalarType<T[P], TranscriptGroupByOutputType[P]>
        }
      >
    >


  export type TranscriptSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    consultationId?: boolean
    text?: boolean
    speaker?: boolean
    timestamp?: boolean
    confidence?: boolean
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transcript"]>

  export type TranscriptSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    consultationId?: boolean
    text?: boolean
    speaker?: boolean
    timestamp?: boolean
    confidence?: boolean
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transcript"]>

  export type TranscriptSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    consultationId?: boolean
    text?: boolean
    speaker?: boolean
    timestamp?: boolean
    confidence?: boolean
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transcript"]>

  export type TranscriptSelectScalar = {
    id?: boolean
    consultationId?: boolean
    text?: boolean
    speaker?: boolean
    timestamp?: boolean
    confidence?: boolean
  }

  export type TranscriptOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "consultationId" | "text" | "speaker" | "timestamp" | "confidence", ExtArgs["result"]["transcript"]>
  export type TranscriptInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
  }
  export type TranscriptIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
  }
  export type TranscriptIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
  }

  export type $TranscriptPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Transcript"
    objects: {
      consultation: Prisma.$ConsultationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      consultationId: string
      text: string
      speaker: $Enums.Speaker
      timestamp: Date
      confidence: number | null
    }, ExtArgs["result"]["transcript"]>
    composites: {}
  }

  type TranscriptGetPayload<S extends boolean | null | undefined | TranscriptDefaultArgs> = $Result.GetResult<Prisma.$TranscriptPayload, S>

  type TranscriptCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TranscriptFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TranscriptCountAggregateInputType | true
    }

  export interface TranscriptDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Transcript'], meta: { name: 'Transcript' } }
    /**
     * Find zero or one Transcript that matches the filter.
     * @param {TranscriptFindUniqueArgs} args - Arguments to find a Transcript
     * @example
     * // Get one Transcript
     * const transcript = await prisma.transcript.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TranscriptFindUniqueArgs>(args: SelectSubset<T, TranscriptFindUniqueArgs<ExtArgs>>): Prisma__TranscriptClient<$Result.GetResult<Prisma.$TranscriptPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Transcript that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TranscriptFindUniqueOrThrowArgs} args - Arguments to find a Transcript
     * @example
     * // Get one Transcript
     * const transcript = await prisma.transcript.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TranscriptFindUniqueOrThrowArgs>(args: SelectSubset<T, TranscriptFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TranscriptClient<$Result.GetResult<Prisma.$TranscriptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transcript that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TranscriptFindFirstArgs} args - Arguments to find a Transcript
     * @example
     * // Get one Transcript
     * const transcript = await prisma.transcript.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TranscriptFindFirstArgs>(args?: SelectSubset<T, TranscriptFindFirstArgs<ExtArgs>>): Prisma__TranscriptClient<$Result.GetResult<Prisma.$TranscriptPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transcript that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TranscriptFindFirstOrThrowArgs} args - Arguments to find a Transcript
     * @example
     * // Get one Transcript
     * const transcript = await prisma.transcript.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TranscriptFindFirstOrThrowArgs>(args?: SelectSubset<T, TranscriptFindFirstOrThrowArgs<ExtArgs>>): Prisma__TranscriptClient<$Result.GetResult<Prisma.$TranscriptPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Transcripts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TranscriptFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transcripts
     * const transcripts = await prisma.transcript.findMany()
     * 
     * // Get first 10 Transcripts
     * const transcripts = await prisma.transcript.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transcriptWithIdOnly = await prisma.transcript.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TranscriptFindManyArgs>(args?: SelectSubset<T, TranscriptFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TranscriptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Transcript.
     * @param {TranscriptCreateArgs} args - Arguments to create a Transcript.
     * @example
     * // Create one Transcript
     * const Transcript = await prisma.transcript.create({
     *   data: {
     *     // ... data to create a Transcript
     *   }
     * })
     * 
     */
    create<T extends TranscriptCreateArgs>(args: SelectSubset<T, TranscriptCreateArgs<ExtArgs>>): Prisma__TranscriptClient<$Result.GetResult<Prisma.$TranscriptPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Transcripts.
     * @param {TranscriptCreateManyArgs} args - Arguments to create many Transcripts.
     * @example
     * // Create many Transcripts
     * const transcript = await prisma.transcript.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TranscriptCreateManyArgs>(args?: SelectSubset<T, TranscriptCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Transcripts and returns the data saved in the database.
     * @param {TranscriptCreateManyAndReturnArgs} args - Arguments to create many Transcripts.
     * @example
     * // Create many Transcripts
     * const transcript = await prisma.transcript.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Transcripts and only return the `id`
     * const transcriptWithIdOnly = await prisma.transcript.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TranscriptCreateManyAndReturnArgs>(args?: SelectSubset<T, TranscriptCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TranscriptPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Transcript.
     * @param {TranscriptDeleteArgs} args - Arguments to delete one Transcript.
     * @example
     * // Delete one Transcript
     * const Transcript = await prisma.transcript.delete({
     *   where: {
     *     // ... filter to delete one Transcript
     *   }
     * })
     * 
     */
    delete<T extends TranscriptDeleteArgs>(args: SelectSubset<T, TranscriptDeleteArgs<ExtArgs>>): Prisma__TranscriptClient<$Result.GetResult<Prisma.$TranscriptPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Transcript.
     * @param {TranscriptUpdateArgs} args - Arguments to update one Transcript.
     * @example
     * // Update one Transcript
     * const transcript = await prisma.transcript.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TranscriptUpdateArgs>(args: SelectSubset<T, TranscriptUpdateArgs<ExtArgs>>): Prisma__TranscriptClient<$Result.GetResult<Prisma.$TranscriptPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Transcripts.
     * @param {TranscriptDeleteManyArgs} args - Arguments to filter Transcripts to delete.
     * @example
     * // Delete a few Transcripts
     * const { count } = await prisma.transcript.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TranscriptDeleteManyArgs>(args?: SelectSubset<T, TranscriptDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transcripts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TranscriptUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transcripts
     * const transcript = await prisma.transcript.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TranscriptUpdateManyArgs>(args: SelectSubset<T, TranscriptUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transcripts and returns the data updated in the database.
     * @param {TranscriptUpdateManyAndReturnArgs} args - Arguments to update many Transcripts.
     * @example
     * // Update many Transcripts
     * const transcript = await prisma.transcript.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Transcripts and only return the `id`
     * const transcriptWithIdOnly = await prisma.transcript.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TranscriptUpdateManyAndReturnArgs>(args: SelectSubset<T, TranscriptUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TranscriptPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Transcript.
     * @param {TranscriptUpsertArgs} args - Arguments to update or create a Transcript.
     * @example
     * // Update or create a Transcript
     * const transcript = await prisma.transcript.upsert({
     *   create: {
     *     // ... data to create a Transcript
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transcript we want to update
     *   }
     * })
     */
    upsert<T extends TranscriptUpsertArgs>(args: SelectSubset<T, TranscriptUpsertArgs<ExtArgs>>): Prisma__TranscriptClient<$Result.GetResult<Prisma.$TranscriptPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Transcripts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TranscriptCountArgs} args - Arguments to filter Transcripts to count.
     * @example
     * // Count the number of Transcripts
     * const count = await prisma.transcript.count({
     *   where: {
     *     // ... the filter for the Transcripts we want to count
     *   }
     * })
    **/
    count<T extends TranscriptCountArgs>(
      args?: Subset<T, TranscriptCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TranscriptCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transcript.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TranscriptAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TranscriptAggregateArgs>(args: Subset<T, TranscriptAggregateArgs>): Prisma.PrismaPromise<GetTranscriptAggregateType<T>>

    /**
     * Group by Transcript.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TranscriptGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TranscriptGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TranscriptGroupByArgs['orderBy'] }
        : { orderBy?: TranscriptGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TranscriptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTranscriptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Transcript model
   */
  readonly fields: TranscriptFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transcript.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TranscriptClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    consultation<T extends ConsultationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConsultationDefaultArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Transcript model
   */
  interface TranscriptFieldRefs {
    readonly id: FieldRef<"Transcript", 'String'>
    readonly consultationId: FieldRef<"Transcript", 'String'>
    readonly text: FieldRef<"Transcript", 'String'>
    readonly speaker: FieldRef<"Transcript", 'Speaker'>
    readonly timestamp: FieldRef<"Transcript", 'DateTime'>
    readonly confidence: FieldRef<"Transcript", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * Transcript findUnique
   */
  export type TranscriptFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transcript
     */
    select?: TranscriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transcript
     */
    omit?: TranscriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranscriptInclude<ExtArgs> | null
    /**
     * Filter, which Transcript to fetch.
     */
    where: TranscriptWhereUniqueInput
  }

  /**
   * Transcript findUniqueOrThrow
   */
  export type TranscriptFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transcript
     */
    select?: TranscriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transcript
     */
    omit?: TranscriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranscriptInclude<ExtArgs> | null
    /**
     * Filter, which Transcript to fetch.
     */
    where: TranscriptWhereUniqueInput
  }

  /**
   * Transcript findFirst
   */
  export type TranscriptFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transcript
     */
    select?: TranscriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transcript
     */
    omit?: TranscriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranscriptInclude<ExtArgs> | null
    /**
     * Filter, which Transcript to fetch.
     */
    where?: TranscriptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transcripts to fetch.
     */
    orderBy?: TranscriptOrderByWithRelationInput | TranscriptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transcripts.
     */
    cursor?: TranscriptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transcripts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transcripts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transcripts.
     */
    distinct?: TranscriptScalarFieldEnum | TranscriptScalarFieldEnum[]
  }

  /**
   * Transcript findFirstOrThrow
   */
  export type TranscriptFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transcript
     */
    select?: TranscriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transcript
     */
    omit?: TranscriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranscriptInclude<ExtArgs> | null
    /**
     * Filter, which Transcript to fetch.
     */
    where?: TranscriptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transcripts to fetch.
     */
    orderBy?: TranscriptOrderByWithRelationInput | TranscriptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transcripts.
     */
    cursor?: TranscriptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transcripts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transcripts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transcripts.
     */
    distinct?: TranscriptScalarFieldEnum | TranscriptScalarFieldEnum[]
  }

  /**
   * Transcript findMany
   */
  export type TranscriptFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transcript
     */
    select?: TranscriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transcript
     */
    omit?: TranscriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranscriptInclude<ExtArgs> | null
    /**
     * Filter, which Transcripts to fetch.
     */
    where?: TranscriptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transcripts to fetch.
     */
    orderBy?: TranscriptOrderByWithRelationInput | TranscriptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transcripts.
     */
    cursor?: TranscriptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transcripts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transcripts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transcripts.
     */
    distinct?: TranscriptScalarFieldEnum | TranscriptScalarFieldEnum[]
  }

  /**
   * Transcript create
   */
  export type TranscriptCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transcript
     */
    select?: TranscriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transcript
     */
    omit?: TranscriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranscriptInclude<ExtArgs> | null
    /**
     * The data needed to create a Transcript.
     */
    data: XOR<TranscriptCreateInput, TranscriptUncheckedCreateInput>
  }

  /**
   * Transcript createMany
   */
  export type TranscriptCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Transcripts.
     */
    data: TranscriptCreateManyInput | TranscriptCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Transcript createManyAndReturn
   */
  export type TranscriptCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transcript
     */
    select?: TranscriptSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transcript
     */
    omit?: TranscriptOmit<ExtArgs> | null
    /**
     * The data used to create many Transcripts.
     */
    data: TranscriptCreateManyInput | TranscriptCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranscriptIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transcript update
   */
  export type TranscriptUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transcript
     */
    select?: TranscriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transcript
     */
    omit?: TranscriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranscriptInclude<ExtArgs> | null
    /**
     * The data needed to update a Transcript.
     */
    data: XOR<TranscriptUpdateInput, TranscriptUncheckedUpdateInput>
    /**
     * Choose, which Transcript to update.
     */
    where: TranscriptWhereUniqueInput
  }

  /**
   * Transcript updateMany
   */
  export type TranscriptUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Transcripts.
     */
    data: XOR<TranscriptUpdateManyMutationInput, TranscriptUncheckedUpdateManyInput>
    /**
     * Filter which Transcripts to update
     */
    where?: TranscriptWhereInput
    /**
     * Limit how many Transcripts to update.
     */
    limit?: number
  }

  /**
   * Transcript updateManyAndReturn
   */
  export type TranscriptUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transcript
     */
    select?: TranscriptSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transcript
     */
    omit?: TranscriptOmit<ExtArgs> | null
    /**
     * The data used to update Transcripts.
     */
    data: XOR<TranscriptUpdateManyMutationInput, TranscriptUncheckedUpdateManyInput>
    /**
     * Filter which Transcripts to update
     */
    where?: TranscriptWhereInput
    /**
     * Limit how many Transcripts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranscriptIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transcript upsert
   */
  export type TranscriptUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transcript
     */
    select?: TranscriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transcript
     */
    omit?: TranscriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranscriptInclude<ExtArgs> | null
    /**
     * The filter to search for the Transcript to update in case it exists.
     */
    where: TranscriptWhereUniqueInput
    /**
     * In case the Transcript found by the `where` argument doesn't exist, create a new Transcript with this data.
     */
    create: XOR<TranscriptCreateInput, TranscriptUncheckedCreateInput>
    /**
     * In case the Transcript was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TranscriptUpdateInput, TranscriptUncheckedUpdateInput>
  }

  /**
   * Transcript delete
   */
  export type TranscriptDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transcript
     */
    select?: TranscriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transcript
     */
    omit?: TranscriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranscriptInclude<ExtArgs> | null
    /**
     * Filter which Transcript to delete.
     */
    where: TranscriptWhereUniqueInput
  }

  /**
   * Transcript deleteMany
   */
  export type TranscriptDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transcripts to delete
     */
    where?: TranscriptWhereInput
    /**
     * Limit how many Transcripts to delete.
     */
    limit?: number
  }

  /**
   * Transcript without action
   */
  export type TranscriptDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transcript
     */
    select?: TranscriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transcript
     */
    omit?: TranscriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranscriptInclude<ExtArgs> | null
  }


  /**
   * Model SOAPNote
   */

  export type AggregateSOAPNote = {
    _count: SOAPNoteCountAggregateOutputType | null
    _min: SOAPNoteMinAggregateOutputType | null
    _max: SOAPNoteMaxAggregateOutputType | null
  }

  export type SOAPNoteMinAggregateOutputType = {
    id: string | null
    consultationId: string | null
    subjective: string | null
    objective: string | null
    assessment: string | null
    plan: string | null
    isApproved: boolean | null
    approvedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SOAPNoteMaxAggregateOutputType = {
    id: string | null
    consultationId: string | null
    subjective: string | null
    objective: string | null
    assessment: string | null
    plan: string | null
    isApproved: boolean | null
    approvedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SOAPNoteCountAggregateOutputType = {
    id: number
    consultationId: number
    subjective: number
    objective: number
    assessment: number
    plan: number
    isApproved: number
    approvedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SOAPNoteMinAggregateInputType = {
    id?: true
    consultationId?: true
    subjective?: true
    objective?: true
    assessment?: true
    plan?: true
    isApproved?: true
    approvedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SOAPNoteMaxAggregateInputType = {
    id?: true
    consultationId?: true
    subjective?: true
    objective?: true
    assessment?: true
    plan?: true
    isApproved?: true
    approvedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SOAPNoteCountAggregateInputType = {
    id?: true
    consultationId?: true
    subjective?: true
    objective?: true
    assessment?: true
    plan?: true
    isApproved?: true
    approvedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SOAPNoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SOAPNote to aggregate.
     */
    where?: SOAPNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SOAPNotes to fetch.
     */
    orderBy?: SOAPNoteOrderByWithRelationInput | SOAPNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SOAPNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SOAPNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SOAPNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SOAPNotes
    **/
    _count?: true | SOAPNoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SOAPNoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SOAPNoteMaxAggregateInputType
  }

  export type GetSOAPNoteAggregateType<T extends SOAPNoteAggregateArgs> = {
        [P in keyof T & keyof AggregateSOAPNote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSOAPNote[P]>
      : GetScalarType<T[P], AggregateSOAPNote[P]>
  }




  export type SOAPNoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SOAPNoteWhereInput
    orderBy?: SOAPNoteOrderByWithAggregationInput | SOAPNoteOrderByWithAggregationInput[]
    by: SOAPNoteScalarFieldEnum[] | SOAPNoteScalarFieldEnum
    having?: SOAPNoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SOAPNoteCountAggregateInputType | true
    _min?: SOAPNoteMinAggregateInputType
    _max?: SOAPNoteMaxAggregateInputType
  }

  export type SOAPNoteGroupByOutputType = {
    id: string
    consultationId: string
    subjective: string
    objective: string
    assessment: string
    plan: string
    isApproved: boolean
    approvedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: SOAPNoteCountAggregateOutputType | null
    _min: SOAPNoteMinAggregateOutputType | null
    _max: SOAPNoteMaxAggregateOutputType | null
  }

  type GetSOAPNoteGroupByPayload<T extends SOAPNoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SOAPNoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SOAPNoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SOAPNoteGroupByOutputType[P]>
            : GetScalarType<T[P], SOAPNoteGroupByOutputType[P]>
        }
      >
    >


  export type SOAPNoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    consultationId?: boolean
    subjective?: boolean
    objective?: boolean
    assessment?: boolean
    plan?: boolean
    isApproved?: boolean
    approvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sOAPNote"]>

  export type SOAPNoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    consultationId?: boolean
    subjective?: boolean
    objective?: boolean
    assessment?: boolean
    plan?: boolean
    isApproved?: boolean
    approvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sOAPNote"]>

  export type SOAPNoteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    consultationId?: boolean
    subjective?: boolean
    objective?: boolean
    assessment?: boolean
    plan?: boolean
    isApproved?: boolean
    approvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sOAPNote"]>

  export type SOAPNoteSelectScalar = {
    id?: boolean
    consultationId?: boolean
    subjective?: boolean
    objective?: boolean
    assessment?: boolean
    plan?: boolean
    isApproved?: boolean
    approvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SOAPNoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "consultationId" | "subjective" | "objective" | "assessment" | "plan" | "isApproved" | "approvedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["sOAPNote"]>
  export type SOAPNoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
  }
  export type SOAPNoteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
  }
  export type SOAPNoteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
  }

  export type $SOAPNotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SOAPNote"
    objects: {
      consultation: Prisma.$ConsultationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      consultationId: string
      subjective: string
      objective: string
      assessment: string
      plan: string
      isApproved: boolean
      approvedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["sOAPNote"]>
    composites: {}
  }

  type SOAPNoteGetPayload<S extends boolean | null | undefined | SOAPNoteDefaultArgs> = $Result.GetResult<Prisma.$SOAPNotePayload, S>

  type SOAPNoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SOAPNoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SOAPNoteCountAggregateInputType | true
    }

  export interface SOAPNoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SOAPNote'], meta: { name: 'SOAPNote' } }
    /**
     * Find zero or one SOAPNote that matches the filter.
     * @param {SOAPNoteFindUniqueArgs} args - Arguments to find a SOAPNote
     * @example
     * // Get one SOAPNote
     * const sOAPNote = await prisma.sOAPNote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SOAPNoteFindUniqueArgs>(args: SelectSubset<T, SOAPNoteFindUniqueArgs<ExtArgs>>): Prisma__SOAPNoteClient<$Result.GetResult<Prisma.$SOAPNotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SOAPNote that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SOAPNoteFindUniqueOrThrowArgs} args - Arguments to find a SOAPNote
     * @example
     * // Get one SOAPNote
     * const sOAPNote = await prisma.sOAPNote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SOAPNoteFindUniqueOrThrowArgs>(args: SelectSubset<T, SOAPNoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SOAPNoteClient<$Result.GetResult<Prisma.$SOAPNotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SOAPNote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SOAPNoteFindFirstArgs} args - Arguments to find a SOAPNote
     * @example
     * // Get one SOAPNote
     * const sOAPNote = await prisma.sOAPNote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SOAPNoteFindFirstArgs>(args?: SelectSubset<T, SOAPNoteFindFirstArgs<ExtArgs>>): Prisma__SOAPNoteClient<$Result.GetResult<Prisma.$SOAPNotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SOAPNote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SOAPNoteFindFirstOrThrowArgs} args - Arguments to find a SOAPNote
     * @example
     * // Get one SOAPNote
     * const sOAPNote = await prisma.sOAPNote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SOAPNoteFindFirstOrThrowArgs>(args?: SelectSubset<T, SOAPNoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__SOAPNoteClient<$Result.GetResult<Prisma.$SOAPNotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SOAPNotes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SOAPNoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SOAPNotes
     * const sOAPNotes = await prisma.sOAPNote.findMany()
     * 
     * // Get first 10 SOAPNotes
     * const sOAPNotes = await prisma.sOAPNote.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sOAPNoteWithIdOnly = await prisma.sOAPNote.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SOAPNoteFindManyArgs>(args?: SelectSubset<T, SOAPNoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SOAPNotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SOAPNote.
     * @param {SOAPNoteCreateArgs} args - Arguments to create a SOAPNote.
     * @example
     * // Create one SOAPNote
     * const SOAPNote = await prisma.sOAPNote.create({
     *   data: {
     *     // ... data to create a SOAPNote
     *   }
     * })
     * 
     */
    create<T extends SOAPNoteCreateArgs>(args: SelectSubset<T, SOAPNoteCreateArgs<ExtArgs>>): Prisma__SOAPNoteClient<$Result.GetResult<Prisma.$SOAPNotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SOAPNotes.
     * @param {SOAPNoteCreateManyArgs} args - Arguments to create many SOAPNotes.
     * @example
     * // Create many SOAPNotes
     * const sOAPNote = await prisma.sOAPNote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SOAPNoteCreateManyArgs>(args?: SelectSubset<T, SOAPNoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SOAPNotes and returns the data saved in the database.
     * @param {SOAPNoteCreateManyAndReturnArgs} args - Arguments to create many SOAPNotes.
     * @example
     * // Create many SOAPNotes
     * const sOAPNote = await prisma.sOAPNote.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SOAPNotes and only return the `id`
     * const sOAPNoteWithIdOnly = await prisma.sOAPNote.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SOAPNoteCreateManyAndReturnArgs>(args?: SelectSubset<T, SOAPNoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SOAPNotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SOAPNote.
     * @param {SOAPNoteDeleteArgs} args - Arguments to delete one SOAPNote.
     * @example
     * // Delete one SOAPNote
     * const SOAPNote = await prisma.sOAPNote.delete({
     *   where: {
     *     // ... filter to delete one SOAPNote
     *   }
     * })
     * 
     */
    delete<T extends SOAPNoteDeleteArgs>(args: SelectSubset<T, SOAPNoteDeleteArgs<ExtArgs>>): Prisma__SOAPNoteClient<$Result.GetResult<Prisma.$SOAPNotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SOAPNote.
     * @param {SOAPNoteUpdateArgs} args - Arguments to update one SOAPNote.
     * @example
     * // Update one SOAPNote
     * const sOAPNote = await prisma.sOAPNote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SOAPNoteUpdateArgs>(args: SelectSubset<T, SOAPNoteUpdateArgs<ExtArgs>>): Prisma__SOAPNoteClient<$Result.GetResult<Prisma.$SOAPNotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SOAPNotes.
     * @param {SOAPNoteDeleteManyArgs} args - Arguments to filter SOAPNotes to delete.
     * @example
     * // Delete a few SOAPNotes
     * const { count } = await prisma.sOAPNote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SOAPNoteDeleteManyArgs>(args?: SelectSubset<T, SOAPNoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SOAPNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SOAPNoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SOAPNotes
     * const sOAPNote = await prisma.sOAPNote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SOAPNoteUpdateManyArgs>(args: SelectSubset<T, SOAPNoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SOAPNotes and returns the data updated in the database.
     * @param {SOAPNoteUpdateManyAndReturnArgs} args - Arguments to update many SOAPNotes.
     * @example
     * // Update many SOAPNotes
     * const sOAPNote = await prisma.sOAPNote.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SOAPNotes and only return the `id`
     * const sOAPNoteWithIdOnly = await prisma.sOAPNote.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SOAPNoteUpdateManyAndReturnArgs>(args: SelectSubset<T, SOAPNoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SOAPNotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SOAPNote.
     * @param {SOAPNoteUpsertArgs} args - Arguments to update or create a SOAPNote.
     * @example
     * // Update or create a SOAPNote
     * const sOAPNote = await prisma.sOAPNote.upsert({
     *   create: {
     *     // ... data to create a SOAPNote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SOAPNote we want to update
     *   }
     * })
     */
    upsert<T extends SOAPNoteUpsertArgs>(args: SelectSubset<T, SOAPNoteUpsertArgs<ExtArgs>>): Prisma__SOAPNoteClient<$Result.GetResult<Prisma.$SOAPNotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SOAPNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SOAPNoteCountArgs} args - Arguments to filter SOAPNotes to count.
     * @example
     * // Count the number of SOAPNotes
     * const count = await prisma.sOAPNote.count({
     *   where: {
     *     // ... the filter for the SOAPNotes we want to count
     *   }
     * })
    **/
    count<T extends SOAPNoteCountArgs>(
      args?: Subset<T, SOAPNoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SOAPNoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SOAPNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SOAPNoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SOAPNoteAggregateArgs>(args: Subset<T, SOAPNoteAggregateArgs>): Prisma.PrismaPromise<GetSOAPNoteAggregateType<T>>

    /**
     * Group by SOAPNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SOAPNoteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SOAPNoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SOAPNoteGroupByArgs['orderBy'] }
        : { orderBy?: SOAPNoteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SOAPNoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSOAPNoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SOAPNote model
   */
  readonly fields: SOAPNoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SOAPNote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SOAPNoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    consultation<T extends ConsultationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConsultationDefaultArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SOAPNote model
   */
  interface SOAPNoteFieldRefs {
    readonly id: FieldRef<"SOAPNote", 'String'>
    readonly consultationId: FieldRef<"SOAPNote", 'String'>
    readonly subjective: FieldRef<"SOAPNote", 'String'>
    readonly objective: FieldRef<"SOAPNote", 'String'>
    readonly assessment: FieldRef<"SOAPNote", 'String'>
    readonly plan: FieldRef<"SOAPNote", 'String'>
    readonly isApproved: FieldRef<"SOAPNote", 'Boolean'>
    readonly approvedAt: FieldRef<"SOAPNote", 'DateTime'>
    readonly createdAt: FieldRef<"SOAPNote", 'DateTime'>
    readonly updatedAt: FieldRef<"SOAPNote", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SOAPNote findUnique
   */
  export type SOAPNoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SOAPNote
     */
    select?: SOAPNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SOAPNote
     */
    omit?: SOAPNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SOAPNoteInclude<ExtArgs> | null
    /**
     * Filter, which SOAPNote to fetch.
     */
    where: SOAPNoteWhereUniqueInput
  }

  /**
   * SOAPNote findUniqueOrThrow
   */
  export type SOAPNoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SOAPNote
     */
    select?: SOAPNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SOAPNote
     */
    omit?: SOAPNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SOAPNoteInclude<ExtArgs> | null
    /**
     * Filter, which SOAPNote to fetch.
     */
    where: SOAPNoteWhereUniqueInput
  }

  /**
   * SOAPNote findFirst
   */
  export type SOAPNoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SOAPNote
     */
    select?: SOAPNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SOAPNote
     */
    omit?: SOAPNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SOAPNoteInclude<ExtArgs> | null
    /**
     * Filter, which SOAPNote to fetch.
     */
    where?: SOAPNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SOAPNotes to fetch.
     */
    orderBy?: SOAPNoteOrderByWithRelationInput | SOAPNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SOAPNotes.
     */
    cursor?: SOAPNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SOAPNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SOAPNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SOAPNotes.
     */
    distinct?: SOAPNoteScalarFieldEnum | SOAPNoteScalarFieldEnum[]
  }

  /**
   * SOAPNote findFirstOrThrow
   */
  export type SOAPNoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SOAPNote
     */
    select?: SOAPNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SOAPNote
     */
    omit?: SOAPNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SOAPNoteInclude<ExtArgs> | null
    /**
     * Filter, which SOAPNote to fetch.
     */
    where?: SOAPNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SOAPNotes to fetch.
     */
    orderBy?: SOAPNoteOrderByWithRelationInput | SOAPNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SOAPNotes.
     */
    cursor?: SOAPNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SOAPNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SOAPNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SOAPNotes.
     */
    distinct?: SOAPNoteScalarFieldEnum | SOAPNoteScalarFieldEnum[]
  }

  /**
   * SOAPNote findMany
   */
  export type SOAPNoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SOAPNote
     */
    select?: SOAPNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SOAPNote
     */
    omit?: SOAPNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SOAPNoteInclude<ExtArgs> | null
    /**
     * Filter, which SOAPNotes to fetch.
     */
    where?: SOAPNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SOAPNotes to fetch.
     */
    orderBy?: SOAPNoteOrderByWithRelationInput | SOAPNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SOAPNotes.
     */
    cursor?: SOAPNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SOAPNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SOAPNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SOAPNotes.
     */
    distinct?: SOAPNoteScalarFieldEnum | SOAPNoteScalarFieldEnum[]
  }

  /**
   * SOAPNote create
   */
  export type SOAPNoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SOAPNote
     */
    select?: SOAPNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SOAPNote
     */
    omit?: SOAPNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SOAPNoteInclude<ExtArgs> | null
    /**
     * The data needed to create a SOAPNote.
     */
    data: XOR<SOAPNoteCreateInput, SOAPNoteUncheckedCreateInput>
  }

  /**
   * SOAPNote createMany
   */
  export type SOAPNoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SOAPNotes.
     */
    data: SOAPNoteCreateManyInput | SOAPNoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SOAPNote createManyAndReturn
   */
  export type SOAPNoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SOAPNote
     */
    select?: SOAPNoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SOAPNote
     */
    omit?: SOAPNoteOmit<ExtArgs> | null
    /**
     * The data used to create many SOAPNotes.
     */
    data: SOAPNoteCreateManyInput | SOAPNoteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SOAPNoteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SOAPNote update
   */
  export type SOAPNoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SOAPNote
     */
    select?: SOAPNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SOAPNote
     */
    omit?: SOAPNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SOAPNoteInclude<ExtArgs> | null
    /**
     * The data needed to update a SOAPNote.
     */
    data: XOR<SOAPNoteUpdateInput, SOAPNoteUncheckedUpdateInput>
    /**
     * Choose, which SOAPNote to update.
     */
    where: SOAPNoteWhereUniqueInput
  }

  /**
   * SOAPNote updateMany
   */
  export type SOAPNoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SOAPNotes.
     */
    data: XOR<SOAPNoteUpdateManyMutationInput, SOAPNoteUncheckedUpdateManyInput>
    /**
     * Filter which SOAPNotes to update
     */
    where?: SOAPNoteWhereInput
    /**
     * Limit how many SOAPNotes to update.
     */
    limit?: number
  }

  /**
   * SOAPNote updateManyAndReturn
   */
  export type SOAPNoteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SOAPNote
     */
    select?: SOAPNoteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SOAPNote
     */
    omit?: SOAPNoteOmit<ExtArgs> | null
    /**
     * The data used to update SOAPNotes.
     */
    data: XOR<SOAPNoteUpdateManyMutationInput, SOAPNoteUncheckedUpdateManyInput>
    /**
     * Filter which SOAPNotes to update
     */
    where?: SOAPNoteWhereInput
    /**
     * Limit how many SOAPNotes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SOAPNoteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SOAPNote upsert
   */
  export type SOAPNoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SOAPNote
     */
    select?: SOAPNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SOAPNote
     */
    omit?: SOAPNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SOAPNoteInclude<ExtArgs> | null
    /**
     * The filter to search for the SOAPNote to update in case it exists.
     */
    where: SOAPNoteWhereUniqueInput
    /**
     * In case the SOAPNote found by the `where` argument doesn't exist, create a new SOAPNote with this data.
     */
    create: XOR<SOAPNoteCreateInput, SOAPNoteUncheckedCreateInput>
    /**
     * In case the SOAPNote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SOAPNoteUpdateInput, SOAPNoteUncheckedUpdateInput>
  }

  /**
   * SOAPNote delete
   */
  export type SOAPNoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SOAPNote
     */
    select?: SOAPNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SOAPNote
     */
    omit?: SOAPNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SOAPNoteInclude<ExtArgs> | null
    /**
     * Filter which SOAPNote to delete.
     */
    where: SOAPNoteWhereUniqueInput
  }

  /**
   * SOAPNote deleteMany
   */
  export type SOAPNoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SOAPNotes to delete
     */
    where?: SOAPNoteWhereInput
    /**
     * Limit how many SOAPNotes to delete.
     */
    limit?: number
  }

  /**
   * SOAPNote without action
   */
  export type SOAPNoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SOAPNote
     */
    select?: SOAPNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SOAPNote
     */
    omit?: SOAPNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SOAPNoteInclude<ExtArgs> | null
  }


  /**
   * Model Prescription
   */

  export type AggregatePrescription = {
    _count: PrescriptionCountAggregateOutputType | null
    _min: PrescriptionMinAggregateOutputType | null
    _max: PrescriptionMaxAggregateOutputType | null
  }

  export type PrescriptionMinAggregateOutputType = {
    id: string | null
    consultationId: string | null
    patientId: string | null
    instructions: string | null
    isApproved: boolean | null
    approvedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PrescriptionMaxAggregateOutputType = {
    id: string | null
    consultationId: string | null
    patientId: string | null
    instructions: string | null
    isApproved: boolean | null
    approvedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PrescriptionCountAggregateOutputType = {
    id: number
    consultationId: number
    patientId: number
    medications: number
    instructions: number
    isApproved: number
    approvedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PrescriptionMinAggregateInputType = {
    id?: true
    consultationId?: true
    patientId?: true
    instructions?: true
    isApproved?: true
    approvedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PrescriptionMaxAggregateInputType = {
    id?: true
    consultationId?: true
    patientId?: true
    instructions?: true
    isApproved?: true
    approvedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PrescriptionCountAggregateInputType = {
    id?: true
    consultationId?: true
    patientId?: true
    medications?: true
    instructions?: true
    isApproved?: true
    approvedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PrescriptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Prescription to aggregate.
     */
    where?: PrescriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prescriptions to fetch.
     */
    orderBy?: PrescriptionOrderByWithRelationInput | PrescriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PrescriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prescriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prescriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Prescriptions
    **/
    _count?: true | PrescriptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PrescriptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PrescriptionMaxAggregateInputType
  }

  export type GetPrescriptionAggregateType<T extends PrescriptionAggregateArgs> = {
        [P in keyof T & keyof AggregatePrescription]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePrescription[P]>
      : GetScalarType<T[P], AggregatePrescription[P]>
  }




  export type PrescriptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PrescriptionWhereInput
    orderBy?: PrescriptionOrderByWithAggregationInput | PrescriptionOrderByWithAggregationInput[]
    by: PrescriptionScalarFieldEnum[] | PrescriptionScalarFieldEnum
    having?: PrescriptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PrescriptionCountAggregateInputType | true
    _min?: PrescriptionMinAggregateInputType
    _max?: PrescriptionMaxAggregateInputType
  }

  export type PrescriptionGroupByOutputType = {
    id: string
    consultationId: string
    patientId: string
    medications: JsonValue
    instructions: string | null
    isApproved: boolean
    approvedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: PrescriptionCountAggregateOutputType | null
    _min: PrescriptionMinAggregateOutputType | null
    _max: PrescriptionMaxAggregateOutputType | null
  }

  type GetPrescriptionGroupByPayload<T extends PrescriptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PrescriptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PrescriptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PrescriptionGroupByOutputType[P]>
            : GetScalarType<T[P], PrescriptionGroupByOutputType[P]>
        }
      >
    >


  export type PrescriptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    consultationId?: boolean
    patientId?: boolean
    medications?: boolean
    instructions?: boolean
    isApproved?: boolean
    approvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["prescription"]>

  export type PrescriptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    consultationId?: boolean
    patientId?: boolean
    medications?: boolean
    instructions?: boolean
    isApproved?: boolean
    approvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["prescription"]>

  export type PrescriptionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    consultationId?: boolean
    patientId?: boolean
    medications?: boolean
    instructions?: boolean
    isApproved?: boolean
    approvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["prescription"]>

  export type PrescriptionSelectScalar = {
    id?: boolean
    consultationId?: boolean
    patientId?: boolean
    medications?: boolean
    instructions?: boolean
    isApproved?: boolean
    approvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PrescriptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "consultationId" | "patientId" | "medications" | "instructions" | "isApproved" | "approvedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["prescription"]>
  export type PrescriptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }
  export type PrescriptionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }
  export type PrescriptionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }

  export type $PrescriptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Prescription"
    objects: {
      consultation: Prisma.$ConsultationPayload<ExtArgs>
      patient: Prisma.$PatientPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      consultationId: string
      patientId: string
      medications: Prisma.JsonValue
      instructions: string | null
      isApproved: boolean
      approvedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["prescription"]>
    composites: {}
  }

  type PrescriptionGetPayload<S extends boolean | null | undefined | PrescriptionDefaultArgs> = $Result.GetResult<Prisma.$PrescriptionPayload, S>

  type PrescriptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PrescriptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PrescriptionCountAggregateInputType | true
    }

  export interface PrescriptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Prescription'], meta: { name: 'Prescription' } }
    /**
     * Find zero or one Prescription that matches the filter.
     * @param {PrescriptionFindUniqueArgs} args - Arguments to find a Prescription
     * @example
     * // Get one Prescription
     * const prescription = await prisma.prescription.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PrescriptionFindUniqueArgs>(args: SelectSubset<T, PrescriptionFindUniqueArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Prescription that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PrescriptionFindUniqueOrThrowArgs} args - Arguments to find a Prescription
     * @example
     * // Get one Prescription
     * const prescription = await prisma.prescription.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PrescriptionFindUniqueOrThrowArgs>(args: SelectSubset<T, PrescriptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Prescription that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrescriptionFindFirstArgs} args - Arguments to find a Prescription
     * @example
     * // Get one Prescription
     * const prescription = await prisma.prescription.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PrescriptionFindFirstArgs>(args?: SelectSubset<T, PrescriptionFindFirstArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Prescription that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrescriptionFindFirstOrThrowArgs} args - Arguments to find a Prescription
     * @example
     * // Get one Prescription
     * const prescription = await prisma.prescription.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PrescriptionFindFirstOrThrowArgs>(args?: SelectSubset<T, PrescriptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Prescriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrescriptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Prescriptions
     * const prescriptions = await prisma.prescription.findMany()
     * 
     * // Get first 10 Prescriptions
     * const prescriptions = await prisma.prescription.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const prescriptionWithIdOnly = await prisma.prescription.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PrescriptionFindManyArgs>(args?: SelectSubset<T, PrescriptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Prescription.
     * @param {PrescriptionCreateArgs} args - Arguments to create a Prescription.
     * @example
     * // Create one Prescription
     * const Prescription = await prisma.prescription.create({
     *   data: {
     *     // ... data to create a Prescription
     *   }
     * })
     * 
     */
    create<T extends PrescriptionCreateArgs>(args: SelectSubset<T, PrescriptionCreateArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Prescriptions.
     * @param {PrescriptionCreateManyArgs} args - Arguments to create many Prescriptions.
     * @example
     * // Create many Prescriptions
     * const prescription = await prisma.prescription.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PrescriptionCreateManyArgs>(args?: SelectSubset<T, PrescriptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Prescriptions and returns the data saved in the database.
     * @param {PrescriptionCreateManyAndReturnArgs} args - Arguments to create many Prescriptions.
     * @example
     * // Create many Prescriptions
     * const prescription = await prisma.prescription.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Prescriptions and only return the `id`
     * const prescriptionWithIdOnly = await prisma.prescription.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PrescriptionCreateManyAndReturnArgs>(args?: SelectSubset<T, PrescriptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Prescription.
     * @param {PrescriptionDeleteArgs} args - Arguments to delete one Prescription.
     * @example
     * // Delete one Prescription
     * const Prescription = await prisma.prescription.delete({
     *   where: {
     *     // ... filter to delete one Prescription
     *   }
     * })
     * 
     */
    delete<T extends PrescriptionDeleteArgs>(args: SelectSubset<T, PrescriptionDeleteArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Prescription.
     * @param {PrescriptionUpdateArgs} args - Arguments to update one Prescription.
     * @example
     * // Update one Prescription
     * const prescription = await prisma.prescription.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PrescriptionUpdateArgs>(args: SelectSubset<T, PrescriptionUpdateArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Prescriptions.
     * @param {PrescriptionDeleteManyArgs} args - Arguments to filter Prescriptions to delete.
     * @example
     * // Delete a few Prescriptions
     * const { count } = await prisma.prescription.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PrescriptionDeleteManyArgs>(args?: SelectSubset<T, PrescriptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Prescriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrescriptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Prescriptions
     * const prescription = await prisma.prescription.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PrescriptionUpdateManyArgs>(args: SelectSubset<T, PrescriptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Prescriptions and returns the data updated in the database.
     * @param {PrescriptionUpdateManyAndReturnArgs} args - Arguments to update many Prescriptions.
     * @example
     * // Update many Prescriptions
     * const prescription = await prisma.prescription.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Prescriptions and only return the `id`
     * const prescriptionWithIdOnly = await prisma.prescription.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PrescriptionUpdateManyAndReturnArgs>(args: SelectSubset<T, PrescriptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Prescription.
     * @param {PrescriptionUpsertArgs} args - Arguments to update or create a Prescription.
     * @example
     * // Update or create a Prescription
     * const prescription = await prisma.prescription.upsert({
     *   create: {
     *     // ... data to create a Prescription
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Prescription we want to update
     *   }
     * })
     */
    upsert<T extends PrescriptionUpsertArgs>(args: SelectSubset<T, PrescriptionUpsertArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Prescriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrescriptionCountArgs} args - Arguments to filter Prescriptions to count.
     * @example
     * // Count the number of Prescriptions
     * const count = await prisma.prescription.count({
     *   where: {
     *     // ... the filter for the Prescriptions we want to count
     *   }
     * })
    **/
    count<T extends PrescriptionCountArgs>(
      args?: Subset<T, PrescriptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PrescriptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Prescription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrescriptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PrescriptionAggregateArgs>(args: Subset<T, PrescriptionAggregateArgs>): Prisma.PrismaPromise<GetPrescriptionAggregateType<T>>

    /**
     * Group by Prescription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrescriptionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PrescriptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PrescriptionGroupByArgs['orderBy'] }
        : { orderBy?: PrescriptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PrescriptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPrescriptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Prescription model
   */
  readonly fields: PrescriptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Prescription.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PrescriptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    consultation<T extends ConsultationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConsultationDefaultArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    patient<T extends PatientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatientDefaultArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Prescription model
   */
  interface PrescriptionFieldRefs {
    readonly id: FieldRef<"Prescription", 'String'>
    readonly consultationId: FieldRef<"Prescription", 'String'>
    readonly patientId: FieldRef<"Prescription", 'String'>
    readonly medications: FieldRef<"Prescription", 'Json'>
    readonly instructions: FieldRef<"Prescription", 'String'>
    readonly isApproved: FieldRef<"Prescription", 'Boolean'>
    readonly approvedAt: FieldRef<"Prescription", 'DateTime'>
    readonly createdAt: FieldRef<"Prescription", 'DateTime'>
    readonly updatedAt: FieldRef<"Prescription", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Prescription findUnique
   */
  export type PrescriptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * Filter, which Prescription to fetch.
     */
    where: PrescriptionWhereUniqueInput
  }

  /**
   * Prescription findUniqueOrThrow
   */
  export type PrescriptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * Filter, which Prescription to fetch.
     */
    where: PrescriptionWhereUniqueInput
  }

  /**
   * Prescription findFirst
   */
  export type PrescriptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * Filter, which Prescription to fetch.
     */
    where?: PrescriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prescriptions to fetch.
     */
    orderBy?: PrescriptionOrderByWithRelationInput | PrescriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Prescriptions.
     */
    cursor?: PrescriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prescriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prescriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Prescriptions.
     */
    distinct?: PrescriptionScalarFieldEnum | PrescriptionScalarFieldEnum[]
  }

  /**
   * Prescription findFirstOrThrow
   */
  export type PrescriptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * Filter, which Prescription to fetch.
     */
    where?: PrescriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prescriptions to fetch.
     */
    orderBy?: PrescriptionOrderByWithRelationInput | PrescriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Prescriptions.
     */
    cursor?: PrescriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prescriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prescriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Prescriptions.
     */
    distinct?: PrescriptionScalarFieldEnum | PrescriptionScalarFieldEnum[]
  }

  /**
   * Prescription findMany
   */
  export type PrescriptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * Filter, which Prescriptions to fetch.
     */
    where?: PrescriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prescriptions to fetch.
     */
    orderBy?: PrescriptionOrderByWithRelationInput | PrescriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Prescriptions.
     */
    cursor?: PrescriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prescriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prescriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Prescriptions.
     */
    distinct?: PrescriptionScalarFieldEnum | PrescriptionScalarFieldEnum[]
  }

  /**
   * Prescription create
   */
  export type PrescriptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * The data needed to create a Prescription.
     */
    data: XOR<PrescriptionCreateInput, PrescriptionUncheckedCreateInput>
  }

  /**
   * Prescription createMany
   */
  export type PrescriptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Prescriptions.
     */
    data: PrescriptionCreateManyInput | PrescriptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Prescription createManyAndReturn
   */
  export type PrescriptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * The data used to create many Prescriptions.
     */
    data: PrescriptionCreateManyInput | PrescriptionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Prescription update
   */
  export type PrescriptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * The data needed to update a Prescription.
     */
    data: XOR<PrescriptionUpdateInput, PrescriptionUncheckedUpdateInput>
    /**
     * Choose, which Prescription to update.
     */
    where: PrescriptionWhereUniqueInput
  }

  /**
   * Prescription updateMany
   */
  export type PrescriptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Prescriptions.
     */
    data: XOR<PrescriptionUpdateManyMutationInput, PrescriptionUncheckedUpdateManyInput>
    /**
     * Filter which Prescriptions to update
     */
    where?: PrescriptionWhereInput
    /**
     * Limit how many Prescriptions to update.
     */
    limit?: number
  }

  /**
   * Prescription updateManyAndReturn
   */
  export type PrescriptionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * The data used to update Prescriptions.
     */
    data: XOR<PrescriptionUpdateManyMutationInput, PrescriptionUncheckedUpdateManyInput>
    /**
     * Filter which Prescriptions to update
     */
    where?: PrescriptionWhereInput
    /**
     * Limit how many Prescriptions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Prescription upsert
   */
  export type PrescriptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * The filter to search for the Prescription to update in case it exists.
     */
    where: PrescriptionWhereUniqueInput
    /**
     * In case the Prescription found by the `where` argument doesn't exist, create a new Prescription with this data.
     */
    create: XOR<PrescriptionCreateInput, PrescriptionUncheckedCreateInput>
    /**
     * In case the Prescription was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PrescriptionUpdateInput, PrescriptionUncheckedUpdateInput>
  }

  /**
   * Prescription delete
   */
  export type PrescriptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * Filter which Prescription to delete.
     */
    where: PrescriptionWhereUniqueInput
  }

  /**
   * Prescription deleteMany
   */
  export type PrescriptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Prescriptions to delete
     */
    where?: PrescriptionWhereInput
    /**
     * Limit how many Prescriptions to delete.
     */
    limit?: number
  }

  /**
   * Prescription without action
   */
  export type PrescriptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
  }


  /**
   * Model Referral
   */

  export type AggregateReferral = {
    _count: ReferralCountAggregateOutputType | null
    _min: ReferralMinAggregateOutputType | null
    _max: ReferralMaxAggregateOutputType | null
  }

  export type ReferralMinAggregateOutputType = {
    id: string | null
    consultationId: string | null
    patientId: string | null
    specialty: string | null
    reason: string | null
    urgency: $Enums.Urgency | null
    notes: string | null
    isApproved: boolean | null
    approvedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReferralMaxAggregateOutputType = {
    id: string | null
    consultationId: string | null
    patientId: string | null
    specialty: string | null
    reason: string | null
    urgency: $Enums.Urgency | null
    notes: string | null
    isApproved: boolean | null
    approvedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReferralCountAggregateOutputType = {
    id: number
    consultationId: number
    patientId: number
    specialty: number
    reason: number
    urgency: number
    notes: number
    isApproved: number
    approvedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ReferralMinAggregateInputType = {
    id?: true
    consultationId?: true
    patientId?: true
    specialty?: true
    reason?: true
    urgency?: true
    notes?: true
    isApproved?: true
    approvedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReferralMaxAggregateInputType = {
    id?: true
    consultationId?: true
    patientId?: true
    specialty?: true
    reason?: true
    urgency?: true
    notes?: true
    isApproved?: true
    approvedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReferralCountAggregateInputType = {
    id?: true
    consultationId?: true
    patientId?: true
    specialty?: true
    reason?: true
    urgency?: true
    notes?: true
    isApproved?: true
    approvedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ReferralAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Referral to aggregate.
     */
    where?: ReferralWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Referrals to fetch.
     */
    orderBy?: ReferralOrderByWithRelationInput | ReferralOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReferralWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Referrals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Referrals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Referrals
    **/
    _count?: true | ReferralCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReferralMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReferralMaxAggregateInputType
  }

  export type GetReferralAggregateType<T extends ReferralAggregateArgs> = {
        [P in keyof T & keyof AggregateReferral]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReferral[P]>
      : GetScalarType<T[P], AggregateReferral[P]>
  }




  export type ReferralGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReferralWhereInput
    orderBy?: ReferralOrderByWithAggregationInput | ReferralOrderByWithAggregationInput[]
    by: ReferralScalarFieldEnum[] | ReferralScalarFieldEnum
    having?: ReferralScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReferralCountAggregateInputType | true
    _min?: ReferralMinAggregateInputType
    _max?: ReferralMaxAggregateInputType
  }

  export type ReferralGroupByOutputType = {
    id: string
    consultationId: string
    patientId: string
    specialty: string
    reason: string
    urgency: $Enums.Urgency
    notes: string | null
    isApproved: boolean
    approvedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: ReferralCountAggregateOutputType | null
    _min: ReferralMinAggregateOutputType | null
    _max: ReferralMaxAggregateOutputType | null
  }

  type GetReferralGroupByPayload<T extends ReferralGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReferralGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReferralGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReferralGroupByOutputType[P]>
            : GetScalarType<T[P], ReferralGroupByOutputType[P]>
        }
      >
    >


  export type ReferralSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    consultationId?: boolean
    patientId?: boolean
    specialty?: boolean
    reason?: boolean
    urgency?: boolean
    notes?: boolean
    isApproved?: boolean
    approvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["referral"]>

  export type ReferralSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    consultationId?: boolean
    patientId?: boolean
    specialty?: boolean
    reason?: boolean
    urgency?: boolean
    notes?: boolean
    isApproved?: boolean
    approvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["referral"]>

  export type ReferralSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    consultationId?: boolean
    patientId?: boolean
    specialty?: boolean
    reason?: boolean
    urgency?: boolean
    notes?: boolean
    isApproved?: boolean
    approvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["referral"]>

  export type ReferralSelectScalar = {
    id?: boolean
    consultationId?: boolean
    patientId?: boolean
    specialty?: boolean
    reason?: boolean
    urgency?: boolean
    notes?: boolean
    isApproved?: boolean
    approvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ReferralOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "consultationId" | "patientId" | "specialty" | "reason" | "urgency" | "notes" | "isApproved" | "approvedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["referral"]>
  export type ReferralInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }
  export type ReferralIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }
  export type ReferralIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }

  export type $ReferralPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Referral"
    objects: {
      consultation: Prisma.$ConsultationPayload<ExtArgs>
      patient: Prisma.$PatientPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      consultationId: string
      patientId: string
      specialty: string
      reason: string
      urgency: $Enums.Urgency
      notes: string | null
      isApproved: boolean
      approvedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["referral"]>
    composites: {}
  }

  type ReferralGetPayload<S extends boolean | null | undefined | ReferralDefaultArgs> = $Result.GetResult<Prisma.$ReferralPayload, S>

  type ReferralCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReferralFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReferralCountAggregateInputType | true
    }

  export interface ReferralDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Referral'], meta: { name: 'Referral' } }
    /**
     * Find zero or one Referral that matches the filter.
     * @param {ReferralFindUniqueArgs} args - Arguments to find a Referral
     * @example
     * // Get one Referral
     * const referral = await prisma.referral.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReferralFindUniqueArgs>(args: SelectSubset<T, ReferralFindUniqueArgs<ExtArgs>>): Prisma__ReferralClient<$Result.GetResult<Prisma.$ReferralPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Referral that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReferralFindUniqueOrThrowArgs} args - Arguments to find a Referral
     * @example
     * // Get one Referral
     * const referral = await prisma.referral.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReferralFindUniqueOrThrowArgs>(args: SelectSubset<T, ReferralFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReferralClient<$Result.GetResult<Prisma.$ReferralPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Referral that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralFindFirstArgs} args - Arguments to find a Referral
     * @example
     * // Get one Referral
     * const referral = await prisma.referral.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReferralFindFirstArgs>(args?: SelectSubset<T, ReferralFindFirstArgs<ExtArgs>>): Prisma__ReferralClient<$Result.GetResult<Prisma.$ReferralPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Referral that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralFindFirstOrThrowArgs} args - Arguments to find a Referral
     * @example
     * // Get one Referral
     * const referral = await prisma.referral.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReferralFindFirstOrThrowArgs>(args?: SelectSubset<T, ReferralFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReferralClient<$Result.GetResult<Prisma.$ReferralPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Referrals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Referrals
     * const referrals = await prisma.referral.findMany()
     * 
     * // Get first 10 Referrals
     * const referrals = await prisma.referral.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const referralWithIdOnly = await prisma.referral.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReferralFindManyArgs>(args?: SelectSubset<T, ReferralFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReferralPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Referral.
     * @param {ReferralCreateArgs} args - Arguments to create a Referral.
     * @example
     * // Create one Referral
     * const Referral = await prisma.referral.create({
     *   data: {
     *     // ... data to create a Referral
     *   }
     * })
     * 
     */
    create<T extends ReferralCreateArgs>(args: SelectSubset<T, ReferralCreateArgs<ExtArgs>>): Prisma__ReferralClient<$Result.GetResult<Prisma.$ReferralPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Referrals.
     * @param {ReferralCreateManyArgs} args - Arguments to create many Referrals.
     * @example
     * // Create many Referrals
     * const referral = await prisma.referral.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReferralCreateManyArgs>(args?: SelectSubset<T, ReferralCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Referrals and returns the data saved in the database.
     * @param {ReferralCreateManyAndReturnArgs} args - Arguments to create many Referrals.
     * @example
     * // Create many Referrals
     * const referral = await prisma.referral.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Referrals and only return the `id`
     * const referralWithIdOnly = await prisma.referral.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReferralCreateManyAndReturnArgs>(args?: SelectSubset<T, ReferralCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReferralPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Referral.
     * @param {ReferralDeleteArgs} args - Arguments to delete one Referral.
     * @example
     * // Delete one Referral
     * const Referral = await prisma.referral.delete({
     *   where: {
     *     // ... filter to delete one Referral
     *   }
     * })
     * 
     */
    delete<T extends ReferralDeleteArgs>(args: SelectSubset<T, ReferralDeleteArgs<ExtArgs>>): Prisma__ReferralClient<$Result.GetResult<Prisma.$ReferralPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Referral.
     * @param {ReferralUpdateArgs} args - Arguments to update one Referral.
     * @example
     * // Update one Referral
     * const referral = await prisma.referral.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReferralUpdateArgs>(args: SelectSubset<T, ReferralUpdateArgs<ExtArgs>>): Prisma__ReferralClient<$Result.GetResult<Prisma.$ReferralPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Referrals.
     * @param {ReferralDeleteManyArgs} args - Arguments to filter Referrals to delete.
     * @example
     * // Delete a few Referrals
     * const { count } = await prisma.referral.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReferralDeleteManyArgs>(args?: SelectSubset<T, ReferralDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Referrals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Referrals
     * const referral = await prisma.referral.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReferralUpdateManyArgs>(args: SelectSubset<T, ReferralUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Referrals and returns the data updated in the database.
     * @param {ReferralUpdateManyAndReturnArgs} args - Arguments to update many Referrals.
     * @example
     * // Update many Referrals
     * const referral = await prisma.referral.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Referrals and only return the `id`
     * const referralWithIdOnly = await prisma.referral.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReferralUpdateManyAndReturnArgs>(args: SelectSubset<T, ReferralUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReferralPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Referral.
     * @param {ReferralUpsertArgs} args - Arguments to update or create a Referral.
     * @example
     * // Update or create a Referral
     * const referral = await prisma.referral.upsert({
     *   create: {
     *     // ... data to create a Referral
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Referral we want to update
     *   }
     * })
     */
    upsert<T extends ReferralUpsertArgs>(args: SelectSubset<T, ReferralUpsertArgs<ExtArgs>>): Prisma__ReferralClient<$Result.GetResult<Prisma.$ReferralPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Referrals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralCountArgs} args - Arguments to filter Referrals to count.
     * @example
     * // Count the number of Referrals
     * const count = await prisma.referral.count({
     *   where: {
     *     // ... the filter for the Referrals we want to count
     *   }
     * })
    **/
    count<T extends ReferralCountArgs>(
      args?: Subset<T, ReferralCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReferralCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Referral.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReferralAggregateArgs>(args: Subset<T, ReferralAggregateArgs>): Prisma.PrismaPromise<GetReferralAggregateType<T>>

    /**
     * Group by Referral.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReferralGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReferralGroupByArgs['orderBy'] }
        : { orderBy?: ReferralGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReferralGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReferralGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Referral model
   */
  readonly fields: ReferralFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Referral.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReferralClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    consultation<T extends ConsultationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConsultationDefaultArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    patient<T extends PatientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatientDefaultArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Referral model
   */
  interface ReferralFieldRefs {
    readonly id: FieldRef<"Referral", 'String'>
    readonly consultationId: FieldRef<"Referral", 'String'>
    readonly patientId: FieldRef<"Referral", 'String'>
    readonly specialty: FieldRef<"Referral", 'String'>
    readonly reason: FieldRef<"Referral", 'String'>
    readonly urgency: FieldRef<"Referral", 'Urgency'>
    readonly notes: FieldRef<"Referral", 'String'>
    readonly isApproved: FieldRef<"Referral", 'Boolean'>
    readonly approvedAt: FieldRef<"Referral", 'DateTime'>
    readonly createdAt: FieldRef<"Referral", 'DateTime'>
    readonly updatedAt: FieldRef<"Referral", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Referral findUnique
   */
  export type ReferralFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Referral
     */
    omit?: ReferralOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null
    /**
     * Filter, which Referral to fetch.
     */
    where: ReferralWhereUniqueInput
  }

  /**
   * Referral findUniqueOrThrow
   */
  export type ReferralFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Referral
     */
    omit?: ReferralOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null
    /**
     * Filter, which Referral to fetch.
     */
    where: ReferralWhereUniqueInput
  }

  /**
   * Referral findFirst
   */
  export type ReferralFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Referral
     */
    omit?: ReferralOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null
    /**
     * Filter, which Referral to fetch.
     */
    where?: ReferralWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Referrals to fetch.
     */
    orderBy?: ReferralOrderByWithRelationInput | ReferralOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Referrals.
     */
    cursor?: ReferralWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Referrals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Referrals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Referrals.
     */
    distinct?: ReferralScalarFieldEnum | ReferralScalarFieldEnum[]
  }

  /**
   * Referral findFirstOrThrow
   */
  export type ReferralFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Referral
     */
    omit?: ReferralOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null
    /**
     * Filter, which Referral to fetch.
     */
    where?: ReferralWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Referrals to fetch.
     */
    orderBy?: ReferralOrderByWithRelationInput | ReferralOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Referrals.
     */
    cursor?: ReferralWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Referrals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Referrals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Referrals.
     */
    distinct?: ReferralScalarFieldEnum | ReferralScalarFieldEnum[]
  }

  /**
   * Referral findMany
   */
  export type ReferralFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Referral
     */
    omit?: ReferralOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null
    /**
     * Filter, which Referrals to fetch.
     */
    where?: ReferralWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Referrals to fetch.
     */
    orderBy?: ReferralOrderByWithRelationInput | ReferralOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Referrals.
     */
    cursor?: ReferralWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Referrals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Referrals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Referrals.
     */
    distinct?: ReferralScalarFieldEnum | ReferralScalarFieldEnum[]
  }

  /**
   * Referral create
   */
  export type ReferralCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Referral
     */
    omit?: ReferralOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null
    /**
     * The data needed to create a Referral.
     */
    data: XOR<ReferralCreateInput, ReferralUncheckedCreateInput>
  }

  /**
   * Referral createMany
   */
  export type ReferralCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Referrals.
     */
    data: ReferralCreateManyInput | ReferralCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Referral createManyAndReturn
   */
  export type ReferralCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Referral
     */
    omit?: ReferralOmit<ExtArgs> | null
    /**
     * The data used to create many Referrals.
     */
    data: ReferralCreateManyInput | ReferralCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Referral update
   */
  export type ReferralUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Referral
     */
    omit?: ReferralOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null
    /**
     * The data needed to update a Referral.
     */
    data: XOR<ReferralUpdateInput, ReferralUncheckedUpdateInput>
    /**
     * Choose, which Referral to update.
     */
    where: ReferralWhereUniqueInput
  }

  /**
   * Referral updateMany
   */
  export type ReferralUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Referrals.
     */
    data: XOR<ReferralUpdateManyMutationInput, ReferralUncheckedUpdateManyInput>
    /**
     * Filter which Referrals to update
     */
    where?: ReferralWhereInput
    /**
     * Limit how many Referrals to update.
     */
    limit?: number
  }

  /**
   * Referral updateManyAndReturn
   */
  export type ReferralUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Referral
     */
    omit?: ReferralOmit<ExtArgs> | null
    /**
     * The data used to update Referrals.
     */
    data: XOR<ReferralUpdateManyMutationInput, ReferralUncheckedUpdateManyInput>
    /**
     * Filter which Referrals to update
     */
    where?: ReferralWhereInput
    /**
     * Limit how many Referrals to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Referral upsert
   */
  export type ReferralUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Referral
     */
    omit?: ReferralOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null
    /**
     * The filter to search for the Referral to update in case it exists.
     */
    where: ReferralWhereUniqueInput
    /**
     * In case the Referral found by the `where` argument doesn't exist, create a new Referral with this data.
     */
    create: XOR<ReferralCreateInput, ReferralUncheckedCreateInput>
    /**
     * In case the Referral was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReferralUpdateInput, ReferralUncheckedUpdateInput>
  }

  /**
   * Referral delete
   */
  export type ReferralDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Referral
     */
    omit?: ReferralOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null
    /**
     * Filter which Referral to delete.
     */
    where: ReferralWhereUniqueInput
  }

  /**
   * Referral deleteMany
   */
  export type ReferralDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Referrals to delete
     */
    where?: ReferralWhereInput
    /**
     * Limit how many Referrals to delete.
     */
    limit?: number
  }

  /**
   * Referral without action
   */
  export type ReferralDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Referral
     */
    omit?: ReferralOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null
  }


  /**
   * Model Appointment
   */

  export type AggregateAppointment = {
    _count: AppointmentCountAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  export type AppointmentMinAggregateOutputType = {
    id: string | null
    consultationId: string | null
    patientId: string | null
    scheduledAt: Date | null
    type: $Enums.AppointmentType | null
    reason: string | null
    isApproved: boolean | null
    approvedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AppointmentMaxAggregateOutputType = {
    id: string | null
    consultationId: string | null
    patientId: string | null
    scheduledAt: Date | null
    type: $Enums.AppointmentType | null
    reason: string | null
    isApproved: boolean | null
    approvedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AppointmentCountAggregateOutputType = {
    id: number
    consultationId: number
    patientId: number
    scheduledAt: number
    type: number
    reason: number
    isApproved: number
    approvedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AppointmentMinAggregateInputType = {
    id?: true
    consultationId?: true
    patientId?: true
    scheduledAt?: true
    type?: true
    reason?: true
    isApproved?: true
    approvedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AppointmentMaxAggregateInputType = {
    id?: true
    consultationId?: true
    patientId?: true
    scheduledAt?: true
    type?: true
    reason?: true
    isApproved?: true
    approvedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AppointmentCountAggregateInputType = {
    id?: true
    consultationId?: true
    patientId?: true
    scheduledAt?: true
    type?: true
    reason?: true
    isApproved?: true
    approvedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AppointmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointment to aggregate.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Appointments
    **/
    _count?: true | AppointmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppointmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppointmentMaxAggregateInputType
  }

  export type GetAppointmentAggregateType<T extends AppointmentAggregateArgs> = {
        [P in keyof T & keyof AggregateAppointment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAppointment[P]>
      : GetScalarType<T[P], AggregateAppointment[P]>
  }




  export type AppointmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithAggregationInput | AppointmentOrderByWithAggregationInput[]
    by: AppointmentScalarFieldEnum[] | AppointmentScalarFieldEnum
    having?: AppointmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppointmentCountAggregateInputType | true
    _min?: AppointmentMinAggregateInputType
    _max?: AppointmentMaxAggregateInputType
  }

  export type AppointmentGroupByOutputType = {
    id: string
    consultationId: string
    patientId: string
    scheduledAt: Date
    type: $Enums.AppointmentType
    reason: string | null
    isApproved: boolean
    approvedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: AppointmentCountAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  type GetAppointmentGroupByPayload<T extends AppointmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppointmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppointmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
            : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
        }
      >
    >


  export type AppointmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    consultationId?: boolean
    patientId?: boolean
    scheduledAt?: boolean
    type?: boolean
    reason?: boolean
    isApproved?: boolean
    approvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    consultationId?: boolean
    patientId?: boolean
    scheduledAt?: boolean
    type?: boolean
    reason?: boolean
    isApproved?: boolean
    approvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    consultationId?: boolean
    patientId?: boolean
    scheduledAt?: boolean
    type?: boolean
    reason?: boolean
    isApproved?: boolean
    approvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectScalar = {
    id?: boolean
    consultationId?: boolean
    patientId?: boolean
    scheduledAt?: boolean
    type?: boolean
    reason?: boolean
    isApproved?: boolean
    approvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AppointmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "consultationId" | "patientId" | "scheduledAt" | "type" | "reason" | "isApproved" | "approvedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["appointment"]>
  export type AppointmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }
  export type AppointmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }
  export type AppointmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }

  export type $AppointmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Appointment"
    objects: {
      consultation: Prisma.$ConsultationPayload<ExtArgs>
      patient: Prisma.$PatientPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      consultationId: string
      patientId: string
      scheduledAt: Date
      type: $Enums.AppointmentType
      reason: string | null
      isApproved: boolean
      approvedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["appointment"]>
    composites: {}
  }

  type AppointmentGetPayload<S extends boolean | null | undefined | AppointmentDefaultArgs> = $Result.GetResult<Prisma.$AppointmentPayload, S>

  type AppointmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AppointmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AppointmentCountAggregateInputType | true
    }

  export interface AppointmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Appointment'], meta: { name: 'Appointment' } }
    /**
     * Find zero or one Appointment that matches the filter.
     * @param {AppointmentFindUniqueArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AppointmentFindUniqueArgs>(args: SelectSubset<T, AppointmentFindUniqueArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Appointment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AppointmentFindUniqueOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AppointmentFindUniqueOrThrowArgs>(args: SelectSubset<T, AppointmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Appointment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AppointmentFindFirstArgs>(args?: SelectSubset<T, AppointmentFindFirstArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Appointment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AppointmentFindFirstOrThrowArgs>(args?: SelectSubset<T, AppointmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Appointments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Appointments
     * const appointments = await prisma.appointment.findMany()
     * 
     * // Get first 10 Appointments
     * const appointments = await prisma.appointment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const appointmentWithIdOnly = await prisma.appointment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AppointmentFindManyArgs>(args?: SelectSubset<T, AppointmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Appointment.
     * @param {AppointmentCreateArgs} args - Arguments to create a Appointment.
     * @example
     * // Create one Appointment
     * const Appointment = await prisma.appointment.create({
     *   data: {
     *     // ... data to create a Appointment
     *   }
     * })
     * 
     */
    create<T extends AppointmentCreateArgs>(args: SelectSubset<T, AppointmentCreateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Appointments.
     * @param {AppointmentCreateManyArgs} args - Arguments to create many Appointments.
     * @example
     * // Create many Appointments
     * const appointment = await prisma.appointment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AppointmentCreateManyArgs>(args?: SelectSubset<T, AppointmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Appointments and returns the data saved in the database.
     * @param {AppointmentCreateManyAndReturnArgs} args - Arguments to create many Appointments.
     * @example
     * // Create many Appointments
     * const appointment = await prisma.appointment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Appointments and only return the `id`
     * const appointmentWithIdOnly = await prisma.appointment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AppointmentCreateManyAndReturnArgs>(args?: SelectSubset<T, AppointmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Appointment.
     * @param {AppointmentDeleteArgs} args - Arguments to delete one Appointment.
     * @example
     * // Delete one Appointment
     * const Appointment = await prisma.appointment.delete({
     *   where: {
     *     // ... filter to delete one Appointment
     *   }
     * })
     * 
     */
    delete<T extends AppointmentDeleteArgs>(args: SelectSubset<T, AppointmentDeleteArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Appointment.
     * @param {AppointmentUpdateArgs} args - Arguments to update one Appointment.
     * @example
     * // Update one Appointment
     * const appointment = await prisma.appointment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AppointmentUpdateArgs>(args: SelectSubset<T, AppointmentUpdateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Appointments.
     * @param {AppointmentDeleteManyArgs} args - Arguments to filter Appointments to delete.
     * @example
     * // Delete a few Appointments
     * const { count } = await prisma.appointment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AppointmentDeleteManyArgs>(args?: SelectSubset<T, AppointmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Appointments
     * const appointment = await prisma.appointment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AppointmentUpdateManyArgs>(args: SelectSubset<T, AppointmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Appointments and returns the data updated in the database.
     * @param {AppointmentUpdateManyAndReturnArgs} args - Arguments to update many Appointments.
     * @example
     * // Update many Appointments
     * const appointment = await prisma.appointment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Appointments and only return the `id`
     * const appointmentWithIdOnly = await prisma.appointment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AppointmentUpdateManyAndReturnArgs>(args: SelectSubset<T, AppointmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Appointment.
     * @param {AppointmentUpsertArgs} args - Arguments to update or create a Appointment.
     * @example
     * // Update or create a Appointment
     * const appointment = await prisma.appointment.upsert({
     *   create: {
     *     // ... data to create a Appointment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Appointment we want to update
     *   }
     * })
     */
    upsert<T extends AppointmentUpsertArgs>(args: SelectSubset<T, AppointmentUpsertArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentCountArgs} args - Arguments to filter Appointments to count.
     * @example
     * // Count the number of Appointments
     * const count = await prisma.appointment.count({
     *   where: {
     *     // ... the filter for the Appointments we want to count
     *   }
     * })
    **/
    count<T extends AppointmentCountArgs>(
      args?: Subset<T, AppointmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppointmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AppointmentAggregateArgs>(args: Subset<T, AppointmentAggregateArgs>): Prisma.PrismaPromise<GetAppointmentAggregateType<T>>

    /**
     * Group by Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AppointmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppointmentGroupByArgs['orderBy'] }
        : { orderBy?: AppointmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AppointmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppointmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Appointment model
   */
  readonly fields: AppointmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Appointment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AppointmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    consultation<T extends ConsultationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConsultationDefaultArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    patient<T extends PatientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatientDefaultArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Appointment model
   */
  interface AppointmentFieldRefs {
    readonly id: FieldRef<"Appointment", 'String'>
    readonly consultationId: FieldRef<"Appointment", 'String'>
    readonly patientId: FieldRef<"Appointment", 'String'>
    readonly scheduledAt: FieldRef<"Appointment", 'DateTime'>
    readonly type: FieldRef<"Appointment", 'AppointmentType'>
    readonly reason: FieldRef<"Appointment", 'String'>
    readonly isApproved: FieldRef<"Appointment", 'Boolean'>
    readonly approvedAt: FieldRef<"Appointment", 'DateTime'>
    readonly createdAt: FieldRef<"Appointment", 'DateTime'>
    readonly updatedAt: FieldRef<"Appointment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Appointment findUnique
   */
  export type AppointmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findUniqueOrThrow
   */
  export type AppointmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findFirst
   */
  export type AppointmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findFirstOrThrow
   */
  export type AppointmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findMany
   */
  export type AppointmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointments to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment create
   */
  export type AppointmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Appointment.
     */
    data: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
  }

  /**
   * Appointment createMany
   */
  export type AppointmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Appointments.
     */
    data: AppointmentCreateManyInput | AppointmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Appointment createManyAndReturn
   */
  export type AppointmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * The data used to create many Appointments.
     */
    data: AppointmentCreateManyInput | AppointmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Appointment update
   */
  export type AppointmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Appointment.
     */
    data: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
    /**
     * Choose, which Appointment to update.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment updateMany
   */
  export type AppointmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Appointments.
     */
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyInput>
    /**
     * Filter which Appointments to update
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to update.
     */
    limit?: number
  }

  /**
   * Appointment updateManyAndReturn
   */
  export type AppointmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * The data used to update Appointments.
     */
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyInput>
    /**
     * Filter which Appointments to update
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Appointment upsert
   */
  export type AppointmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Appointment to update in case it exists.
     */
    where: AppointmentWhereUniqueInput
    /**
     * In case the Appointment found by the `where` argument doesn't exist, create a new Appointment with this data.
     */
    create: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
    /**
     * In case the Appointment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
  }

  /**
   * Appointment delete
   */
  export type AppointmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter which Appointment to delete.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment deleteMany
   */
  export type AppointmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointments to delete
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to delete.
     */
    limit?: number
  }

  /**
   * Appointment without action
   */
  export type AppointmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    action: string | null
    resourceType: string | null
    resourceId: string | null
    ipAddress: string | null
    userAgent: string | null
    timestamp: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    action: string | null
    resourceType: string | null
    resourceId: string | null
    ipAddress: string | null
    userAgent: string | null
    timestamp: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    userId: number
    action: number
    resourceType: number
    resourceId: number
    metadata: number
    ipAddress: number
    userAgent: number
    timestamp: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    resourceType?: true
    resourceId?: true
    ipAddress?: true
    userAgent?: true
    timestamp?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    resourceType?: true
    resourceId?: true
    ipAddress?: true
    userAgent?: true
    timestamp?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    resourceType?: true
    resourceId?: true
    metadata?: true
    ipAddress?: true
    userAgent?: true
    timestamp?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    userId: string
    action: string
    resourceType: string
    resourceId: string
    metadata: JsonValue | null
    ipAddress: string | null
    userAgent: string | null
    timestamp: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    resourceType?: boolean
    resourceId?: boolean
    metadata?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    timestamp?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    resourceType?: boolean
    resourceId?: boolean
    metadata?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    timestamp?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    resourceType?: boolean
    resourceId?: boolean
    metadata?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    timestamp?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    userId?: boolean
    action?: boolean
    resourceType?: boolean
    resourceId?: boolean
    metadata?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    timestamp?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "action" | "resourceType" | "resourceId" | "metadata" | "ipAddress" | "userAgent" | "timestamp", ExtArgs["result"]["auditLog"]>
  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AuditLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      action: string
      resourceType: string
      resourceId: string
      metadata: Prisma.JsonValue | null
      ipAddress: string | null
      userAgent: string | null
      timestamp: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs and returns the data updated in the database.
     * @param {AuditLogUpdateManyAndReturnArgs} args - Arguments to update many AuditLogs.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly userId: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly resourceType: FieldRef<"AuditLog", 'String'>
    readonly resourceId: FieldRef<"AuditLog", 'String'>
    readonly metadata: FieldRef<"AuditLog", 'Json'>
    readonly ipAddress: FieldRef<"AuditLog", 'String'>
    readonly userAgent: FieldRef<"AuditLog", 'String'>
    readonly timestamp: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog updateManyAndReturn
   */
  export type AuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    passwordHash: 'passwordHash',
    role: 'role',
    specialty: 'specialty',
    licenseNumber: 'licenseNumber',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const PatientScalarFieldEnum: {
    id: 'id',
    mrn: 'mrn',
    firstName: 'firstName',
    lastName: 'lastName',
    dob: 'dob',
    gender: 'gender',
    phone: 'phone',
    email: 'email',
    address: 'address',
    allergies: 'allergies',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PatientScalarFieldEnum = (typeof PatientScalarFieldEnum)[keyof typeof PatientScalarFieldEnum]


  export const ConsultationScalarFieldEnum: {
    id: 'id',
    patientId: 'patientId',
    doctorId: 'doctorId',
    startedAt: 'startedAt',
    endedAt: 'endedAt',
    status: 'status',
    audioUrl: 'audioUrl',
    duration: 'duration',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ConsultationScalarFieldEnum = (typeof ConsultationScalarFieldEnum)[keyof typeof ConsultationScalarFieldEnum]


  export const TranscriptScalarFieldEnum: {
    id: 'id',
    consultationId: 'consultationId',
    text: 'text',
    speaker: 'speaker',
    timestamp: 'timestamp',
    confidence: 'confidence'
  };

  export type TranscriptScalarFieldEnum = (typeof TranscriptScalarFieldEnum)[keyof typeof TranscriptScalarFieldEnum]


  export const SOAPNoteScalarFieldEnum: {
    id: 'id',
    consultationId: 'consultationId',
    subjective: 'subjective',
    objective: 'objective',
    assessment: 'assessment',
    plan: 'plan',
    isApproved: 'isApproved',
    approvedAt: 'approvedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SOAPNoteScalarFieldEnum = (typeof SOAPNoteScalarFieldEnum)[keyof typeof SOAPNoteScalarFieldEnum]


  export const PrescriptionScalarFieldEnum: {
    id: 'id',
    consultationId: 'consultationId',
    patientId: 'patientId',
    medications: 'medications',
    instructions: 'instructions',
    isApproved: 'isApproved',
    approvedAt: 'approvedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PrescriptionScalarFieldEnum = (typeof PrescriptionScalarFieldEnum)[keyof typeof PrescriptionScalarFieldEnum]


  export const ReferralScalarFieldEnum: {
    id: 'id',
    consultationId: 'consultationId',
    patientId: 'patientId',
    specialty: 'specialty',
    reason: 'reason',
    urgency: 'urgency',
    notes: 'notes',
    isApproved: 'isApproved',
    approvedAt: 'approvedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ReferralScalarFieldEnum = (typeof ReferralScalarFieldEnum)[keyof typeof ReferralScalarFieldEnum]


  export const AppointmentScalarFieldEnum: {
    id: 'id',
    consultationId: 'consultationId',
    patientId: 'patientId',
    scheduledAt: 'scheduledAt',
    type: 'type',
    reason: 'reason',
    isApproved: 'isApproved',
    approvedAt: 'approvedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AppointmentScalarFieldEnum = (typeof AppointmentScalarFieldEnum)[keyof typeof AppointmentScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    action: 'action',
    resourceType: 'resourceType',
    resourceId: 'resourceId',
    metadata: 'metadata',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    timestamp: 'timestamp'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Gender'
   */
  export type EnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender'>
    


  /**
   * Reference to a field of type 'Gender[]'
   */
  export type ListEnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender[]'>
    


  /**
   * Reference to a field of type 'ConsultationStatus'
   */
  export type EnumConsultationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConsultationStatus'>
    


  /**
   * Reference to a field of type 'ConsultationStatus[]'
   */
  export type ListEnumConsultationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConsultationStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Speaker'
   */
  export type EnumSpeakerFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Speaker'>
    


  /**
   * Reference to a field of type 'Speaker[]'
   */
  export type ListEnumSpeakerFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Speaker[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Urgency'
   */
  export type EnumUrgencyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Urgency'>
    


  /**
   * Reference to a field of type 'Urgency[]'
   */
  export type ListEnumUrgencyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Urgency[]'>
    


  /**
   * Reference to a field of type 'AppointmentType'
   */
  export type EnumAppointmentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AppointmentType'>
    


  /**
   * Reference to a field of type 'AppointmentType[]'
   */
  export type ListEnumAppointmentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AppointmentType[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    specialty?: StringNullableFilter<"User"> | string | null
    licenseNumber?: StringNullableFilter<"User"> | string | null
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    consultations?: ConsultationListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    specialty?: SortOrderInput | SortOrder
    licenseNumber?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    consultations?: ConsultationOrderByRelationAggregateInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    licenseNumber?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    specialty?: StringNullableFilter<"User"> | string | null
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    consultations?: ConsultationListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }, "id" | "email" | "licenseNumber">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    specialty?: SortOrderInput | SortOrder
    licenseNumber?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    specialty?: StringNullableWithAggregatesFilter<"User"> | string | null
    licenseNumber?: StringNullableWithAggregatesFilter<"User"> | string | null
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type PatientWhereInput = {
    AND?: PatientWhereInput | PatientWhereInput[]
    OR?: PatientWhereInput[]
    NOT?: PatientWhereInput | PatientWhereInput[]
    id?: StringFilter<"Patient"> | string
    mrn?: StringFilter<"Patient"> | string
    firstName?: StringFilter<"Patient"> | string
    lastName?: StringFilter<"Patient"> | string
    dob?: DateTimeFilter<"Patient"> | Date | string
    gender?: EnumGenderFilter<"Patient"> | $Enums.Gender
    phone?: StringNullableFilter<"Patient"> | string | null
    email?: StringNullableFilter<"Patient"> | string | null
    address?: StringNullableFilter<"Patient"> | string | null
    allergies?: StringNullableListFilter<"Patient">
    createdAt?: DateTimeFilter<"Patient"> | Date | string
    updatedAt?: DateTimeFilter<"Patient"> | Date | string
    consultations?: ConsultationListRelationFilter
    prescriptions?: PrescriptionListRelationFilter
    referrals?: ReferralListRelationFilter
    appointments?: AppointmentListRelationFilter
  }

  export type PatientOrderByWithRelationInput = {
    id?: SortOrder
    mrn?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    dob?: SortOrder
    gender?: SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    allergies?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    consultations?: ConsultationOrderByRelationAggregateInput
    prescriptions?: PrescriptionOrderByRelationAggregateInput
    referrals?: ReferralOrderByRelationAggregateInput
    appointments?: AppointmentOrderByRelationAggregateInput
  }

  export type PatientWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    mrn?: string
    AND?: PatientWhereInput | PatientWhereInput[]
    OR?: PatientWhereInput[]
    NOT?: PatientWhereInput | PatientWhereInput[]
    firstName?: StringFilter<"Patient"> | string
    lastName?: StringFilter<"Patient"> | string
    dob?: DateTimeFilter<"Patient"> | Date | string
    gender?: EnumGenderFilter<"Patient"> | $Enums.Gender
    phone?: StringNullableFilter<"Patient"> | string | null
    email?: StringNullableFilter<"Patient"> | string | null
    address?: StringNullableFilter<"Patient"> | string | null
    allergies?: StringNullableListFilter<"Patient">
    createdAt?: DateTimeFilter<"Patient"> | Date | string
    updatedAt?: DateTimeFilter<"Patient"> | Date | string
    consultations?: ConsultationListRelationFilter
    prescriptions?: PrescriptionListRelationFilter
    referrals?: ReferralListRelationFilter
    appointments?: AppointmentListRelationFilter
  }, "id" | "mrn">

  export type PatientOrderByWithAggregationInput = {
    id?: SortOrder
    mrn?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    dob?: SortOrder
    gender?: SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    allergies?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PatientCountOrderByAggregateInput
    _max?: PatientMaxOrderByAggregateInput
    _min?: PatientMinOrderByAggregateInput
  }

  export type PatientScalarWhereWithAggregatesInput = {
    AND?: PatientScalarWhereWithAggregatesInput | PatientScalarWhereWithAggregatesInput[]
    OR?: PatientScalarWhereWithAggregatesInput[]
    NOT?: PatientScalarWhereWithAggregatesInput | PatientScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Patient"> | string
    mrn?: StringWithAggregatesFilter<"Patient"> | string
    firstName?: StringWithAggregatesFilter<"Patient"> | string
    lastName?: StringWithAggregatesFilter<"Patient"> | string
    dob?: DateTimeWithAggregatesFilter<"Patient"> | Date | string
    gender?: EnumGenderWithAggregatesFilter<"Patient"> | $Enums.Gender
    phone?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    email?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    address?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    allergies?: StringNullableListFilter<"Patient">
    createdAt?: DateTimeWithAggregatesFilter<"Patient"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Patient"> | Date | string
  }

  export type ConsultationWhereInput = {
    AND?: ConsultationWhereInput | ConsultationWhereInput[]
    OR?: ConsultationWhereInput[]
    NOT?: ConsultationWhereInput | ConsultationWhereInput[]
    id?: StringFilter<"Consultation"> | string
    patientId?: StringFilter<"Consultation"> | string
    doctorId?: StringFilter<"Consultation"> | string
    startedAt?: DateTimeFilter<"Consultation"> | Date | string
    endedAt?: DateTimeNullableFilter<"Consultation"> | Date | string | null
    status?: EnumConsultationStatusFilter<"Consultation"> | $Enums.ConsultationStatus
    audioUrl?: StringNullableFilter<"Consultation"> | string | null
    duration?: IntNullableFilter<"Consultation"> | number | null
    createdAt?: DateTimeFilter<"Consultation"> | Date | string
    updatedAt?: DateTimeFilter<"Consultation"> | Date | string
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
    doctor?: XOR<UserScalarRelationFilter, UserWhereInput>
    transcripts?: TranscriptListRelationFilter
    soapNote?: XOR<SOAPNoteNullableScalarRelationFilter, SOAPNoteWhereInput> | null
    prescription?: XOR<PrescriptionNullableScalarRelationFilter, PrescriptionWhereInput> | null
    referral?: XOR<ReferralNullableScalarRelationFilter, ReferralWhereInput> | null
    appointment?: XOR<AppointmentNullableScalarRelationFilter, AppointmentWhereInput> | null
  }

  export type ConsultationOrderByWithRelationInput = {
    id?: SortOrder
    patientId?: SortOrder
    doctorId?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrderInput | SortOrder
    status?: SortOrder
    audioUrl?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patient?: PatientOrderByWithRelationInput
    doctor?: UserOrderByWithRelationInput
    transcripts?: TranscriptOrderByRelationAggregateInput
    soapNote?: SOAPNoteOrderByWithRelationInput
    prescription?: PrescriptionOrderByWithRelationInput
    referral?: ReferralOrderByWithRelationInput
    appointment?: AppointmentOrderByWithRelationInput
  }

  export type ConsultationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ConsultationWhereInput | ConsultationWhereInput[]
    OR?: ConsultationWhereInput[]
    NOT?: ConsultationWhereInput | ConsultationWhereInput[]
    patientId?: StringFilter<"Consultation"> | string
    doctorId?: StringFilter<"Consultation"> | string
    startedAt?: DateTimeFilter<"Consultation"> | Date | string
    endedAt?: DateTimeNullableFilter<"Consultation"> | Date | string | null
    status?: EnumConsultationStatusFilter<"Consultation"> | $Enums.ConsultationStatus
    audioUrl?: StringNullableFilter<"Consultation"> | string | null
    duration?: IntNullableFilter<"Consultation"> | number | null
    createdAt?: DateTimeFilter<"Consultation"> | Date | string
    updatedAt?: DateTimeFilter<"Consultation"> | Date | string
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
    doctor?: XOR<UserScalarRelationFilter, UserWhereInput>
    transcripts?: TranscriptListRelationFilter
    soapNote?: XOR<SOAPNoteNullableScalarRelationFilter, SOAPNoteWhereInput> | null
    prescription?: XOR<PrescriptionNullableScalarRelationFilter, PrescriptionWhereInput> | null
    referral?: XOR<ReferralNullableScalarRelationFilter, ReferralWhereInput> | null
    appointment?: XOR<AppointmentNullableScalarRelationFilter, AppointmentWhereInput> | null
  }, "id">

  export type ConsultationOrderByWithAggregationInput = {
    id?: SortOrder
    patientId?: SortOrder
    doctorId?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrderInput | SortOrder
    status?: SortOrder
    audioUrl?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ConsultationCountOrderByAggregateInput
    _avg?: ConsultationAvgOrderByAggregateInput
    _max?: ConsultationMaxOrderByAggregateInput
    _min?: ConsultationMinOrderByAggregateInput
    _sum?: ConsultationSumOrderByAggregateInput
  }

  export type ConsultationScalarWhereWithAggregatesInput = {
    AND?: ConsultationScalarWhereWithAggregatesInput | ConsultationScalarWhereWithAggregatesInput[]
    OR?: ConsultationScalarWhereWithAggregatesInput[]
    NOT?: ConsultationScalarWhereWithAggregatesInput | ConsultationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Consultation"> | string
    patientId?: StringWithAggregatesFilter<"Consultation"> | string
    doctorId?: StringWithAggregatesFilter<"Consultation"> | string
    startedAt?: DateTimeWithAggregatesFilter<"Consultation"> | Date | string
    endedAt?: DateTimeNullableWithAggregatesFilter<"Consultation"> | Date | string | null
    status?: EnumConsultationStatusWithAggregatesFilter<"Consultation"> | $Enums.ConsultationStatus
    audioUrl?: StringNullableWithAggregatesFilter<"Consultation"> | string | null
    duration?: IntNullableWithAggregatesFilter<"Consultation"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Consultation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Consultation"> | Date | string
  }

  export type TranscriptWhereInput = {
    AND?: TranscriptWhereInput | TranscriptWhereInput[]
    OR?: TranscriptWhereInput[]
    NOT?: TranscriptWhereInput | TranscriptWhereInput[]
    id?: StringFilter<"Transcript"> | string
    consultationId?: StringFilter<"Transcript"> | string
    text?: StringFilter<"Transcript"> | string
    speaker?: EnumSpeakerFilter<"Transcript"> | $Enums.Speaker
    timestamp?: DateTimeFilter<"Transcript"> | Date | string
    confidence?: FloatNullableFilter<"Transcript"> | number | null
    consultation?: XOR<ConsultationScalarRelationFilter, ConsultationWhereInput>
  }

  export type TranscriptOrderByWithRelationInput = {
    id?: SortOrder
    consultationId?: SortOrder
    text?: SortOrder
    speaker?: SortOrder
    timestamp?: SortOrder
    confidence?: SortOrderInput | SortOrder
    consultation?: ConsultationOrderByWithRelationInput
  }

  export type TranscriptWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TranscriptWhereInput | TranscriptWhereInput[]
    OR?: TranscriptWhereInput[]
    NOT?: TranscriptWhereInput | TranscriptWhereInput[]
    consultationId?: StringFilter<"Transcript"> | string
    text?: StringFilter<"Transcript"> | string
    speaker?: EnumSpeakerFilter<"Transcript"> | $Enums.Speaker
    timestamp?: DateTimeFilter<"Transcript"> | Date | string
    confidence?: FloatNullableFilter<"Transcript"> | number | null
    consultation?: XOR<ConsultationScalarRelationFilter, ConsultationWhereInput>
  }, "id">

  export type TranscriptOrderByWithAggregationInput = {
    id?: SortOrder
    consultationId?: SortOrder
    text?: SortOrder
    speaker?: SortOrder
    timestamp?: SortOrder
    confidence?: SortOrderInput | SortOrder
    _count?: TranscriptCountOrderByAggregateInput
    _avg?: TranscriptAvgOrderByAggregateInput
    _max?: TranscriptMaxOrderByAggregateInput
    _min?: TranscriptMinOrderByAggregateInput
    _sum?: TranscriptSumOrderByAggregateInput
  }

  export type TranscriptScalarWhereWithAggregatesInput = {
    AND?: TranscriptScalarWhereWithAggregatesInput | TranscriptScalarWhereWithAggregatesInput[]
    OR?: TranscriptScalarWhereWithAggregatesInput[]
    NOT?: TranscriptScalarWhereWithAggregatesInput | TranscriptScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Transcript"> | string
    consultationId?: StringWithAggregatesFilter<"Transcript"> | string
    text?: StringWithAggregatesFilter<"Transcript"> | string
    speaker?: EnumSpeakerWithAggregatesFilter<"Transcript"> | $Enums.Speaker
    timestamp?: DateTimeWithAggregatesFilter<"Transcript"> | Date | string
    confidence?: FloatNullableWithAggregatesFilter<"Transcript"> | number | null
  }

  export type SOAPNoteWhereInput = {
    AND?: SOAPNoteWhereInput | SOAPNoteWhereInput[]
    OR?: SOAPNoteWhereInput[]
    NOT?: SOAPNoteWhereInput | SOAPNoteWhereInput[]
    id?: StringFilter<"SOAPNote"> | string
    consultationId?: StringFilter<"SOAPNote"> | string
    subjective?: StringFilter<"SOAPNote"> | string
    objective?: StringFilter<"SOAPNote"> | string
    assessment?: StringFilter<"SOAPNote"> | string
    plan?: StringFilter<"SOAPNote"> | string
    isApproved?: BoolFilter<"SOAPNote"> | boolean
    approvedAt?: DateTimeNullableFilter<"SOAPNote"> | Date | string | null
    createdAt?: DateTimeFilter<"SOAPNote"> | Date | string
    updatedAt?: DateTimeFilter<"SOAPNote"> | Date | string
    consultation?: XOR<ConsultationScalarRelationFilter, ConsultationWhereInput>
  }

  export type SOAPNoteOrderByWithRelationInput = {
    id?: SortOrder
    consultationId?: SortOrder
    subjective?: SortOrder
    objective?: SortOrder
    assessment?: SortOrder
    plan?: SortOrder
    isApproved?: SortOrder
    approvedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    consultation?: ConsultationOrderByWithRelationInput
  }

  export type SOAPNoteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    consultationId?: string
    AND?: SOAPNoteWhereInput | SOAPNoteWhereInput[]
    OR?: SOAPNoteWhereInput[]
    NOT?: SOAPNoteWhereInput | SOAPNoteWhereInput[]
    subjective?: StringFilter<"SOAPNote"> | string
    objective?: StringFilter<"SOAPNote"> | string
    assessment?: StringFilter<"SOAPNote"> | string
    plan?: StringFilter<"SOAPNote"> | string
    isApproved?: BoolFilter<"SOAPNote"> | boolean
    approvedAt?: DateTimeNullableFilter<"SOAPNote"> | Date | string | null
    createdAt?: DateTimeFilter<"SOAPNote"> | Date | string
    updatedAt?: DateTimeFilter<"SOAPNote"> | Date | string
    consultation?: XOR<ConsultationScalarRelationFilter, ConsultationWhereInput>
  }, "id" | "consultationId">

  export type SOAPNoteOrderByWithAggregationInput = {
    id?: SortOrder
    consultationId?: SortOrder
    subjective?: SortOrder
    objective?: SortOrder
    assessment?: SortOrder
    plan?: SortOrder
    isApproved?: SortOrder
    approvedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SOAPNoteCountOrderByAggregateInput
    _max?: SOAPNoteMaxOrderByAggregateInput
    _min?: SOAPNoteMinOrderByAggregateInput
  }

  export type SOAPNoteScalarWhereWithAggregatesInput = {
    AND?: SOAPNoteScalarWhereWithAggregatesInput | SOAPNoteScalarWhereWithAggregatesInput[]
    OR?: SOAPNoteScalarWhereWithAggregatesInput[]
    NOT?: SOAPNoteScalarWhereWithAggregatesInput | SOAPNoteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SOAPNote"> | string
    consultationId?: StringWithAggregatesFilter<"SOAPNote"> | string
    subjective?: StringWithAggregatesFilter<"SOAPNote"> | string
    objective?: StringWithAggregatesFilter<"SOAPNote"> | string
    assessment?: StringWithAggregatesFilter<"SOAPNote"> | string
    plan?: StringWithAggregatesFilter<"SOAPNote"> | string
    isApproved?: BoolWithAggregatesFilter<"SOAPNote"> | boolean
    approvedAt?: DateTimeNullableWithAggregatesFilter<"SOAPNote"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SOAPNote"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SOAPNote"> | Date | string
  }

  export type PrescriptionWhereInput = {
    AND?: PrescriptionWhereInput | PrescriptionWhereInput[]
    OR?: PrescriptionWhereInput[]
    NOT?: PrescriptionWhereInput | PrescriptionWhereInput[]
    id?: StringFilter<"Prescription"> | string
    consultationId?: StringFilter<"Prescription"> | string
    patientId?: StringFilter<"Prescription"> | string
    medications?: JsonFilter<"Prescription">
    instructions?: StringNullableFilter<"Prescription"> | string | null
    isApproved?: BoolFilter<"Prescription"> | boolean
    approvedAt?: DateTimeNullableFilter<"Prescription"> | Date | string | null
    createdAt?: DateTimeFilter<"Prescription"> | Date | string
    updatedAt?: DateTimeFilter<"Prescription"> | Date | string
    consultation?: XOR<ConsultationScalarRelationFilter, ConsultationWhereInput>
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
  }

  export type PrescriptionOrderByWithRelationInput = {
    id?: SortOrder
    consultationId?: SortOrder
    patientId?: SortOrder
    medications?: SortOrder
    instructions?: SortOrderInput | SortOrder
    isApproved?: SortOrder
    approvedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    consultation?: ConsultationOrderByWithRelationInput
    patient?: PatientOrderByWithRelationInput
  }

  export type PrescriptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    consultationId?: string
    AND?: PrescriptionWhereInput | PrescriptionWhereInput[]
    OR?: PrescriptionWhereInput[]
    NOT?: PrescriptionWhereInput | PrescriptionWhereInput[]
    patientId?: StringFilter<"Prescription"> | string
    medications?: JsonFilter<"Prescription">
    instructions?: StringNullableFilter<"Prescription"> | string | null
    isApproved?: BoolFilter<"Prescription"> | boolean
    approvedAt?: DateTimeNullableFilter<"Prescription"> | Date | string | null
    createdAt?: DateTimeFilter<"Prescription"> | Date | string
    updatedAt?: DateTimeFilter<"Prescription"> | Date | string
    consultation?: XOR<ConsultationScalarRelationFilter, ConsultationWhereInput>
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
  }, "id" | "consultationId">

  export type PrescriptionOrderByWithAggregationInput = {
    id?: SortOrder
    consultationId?: SortOrder
    patientId?: SortOrder
    medications?: SortOrder
    instructions?: SortOrderInput | SortOrder
    isApproved?: SortOrder
    approvedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PrescriptionCountOrderByAggregateInput
    _max?: PrescriptionMaxOrderByAggregateInput
    _min?: PrescriptionMinOrderByAggregateInput
  }

  export type PrescriptionScalarWhereWithAggregatesInput = {
    AND?: PrescriptionScalarWhereWithAggregatesInput | PrescriptionScalarWhereWithAggregatesInput[]
    OR?: PrescriptionScalarWhereWithAggregatesInput[]
    NOT?: PrescriptionScalarWhereWithAggregatesInput | PrescriptionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Prescription"> | string
    consultationId?: StringWithAggregatesFilter<"Prescription"> | string
    patientId?: StringWithAggregatesFilter<"Prescription"> | string
    medications?: JsonWithAggregatesFilter<"Prescription">
    instructions?: StringNullableWithAggregatesFilter<"Prescription"> | string | null
    isApproved?: BoolWithAggregatesFilter<"Prescription"> | boolean
    approvedAt?: DateTimeNullableWithAggregatesFilter<"Prescription"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Prescription"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Prescription"> | Date | string
  }

  export type ReferralWhereInput = {
    AND?: ReferralWhereInput | ReferralWhereInput[]
    OR?: ReferralWhereInput[]
    NOT?: ReferralWhereInput | ReferralWhereInput[]
    id?: StringFilter<"Referral"> | string
    consultationId?: StringFilter<"Referral"> | string
    patientId?: StringFilter<"Referral"> | string
    specialty?: StringFilter<"Referral"> | string
    reason?: StringFilter<"Referral"> | string
    urgency?: EnumUrgencyFilter<"Referral"> | $Enums.Urgency
    notes?: StringNullableFilter<"Referral"> | string | null
    isApproved?: BoolFilter<"Referral"> | boolean
    approvedAt?: DateTimeNullableFilter<"Referral"> | Date | string | null
    createdAt?: DateTimeFilter<"Referral"> | Date | string
    updatedAt?: DateTimeFilter<"Referral"> | Date | string
    consultation?: XOR<ConsultationScalarRelationFilter, ConsultationWhereInput>
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
  }

  export type ReferralOrderByWithRelationInput = {
    id?: SortOrder
    consultationId?: SortOrder
    patientId?: SortOrder
    specialty?: SortOrder
    reason?: SortOrder
    urgency?: SortOrder
    notes?: SortOrderInput | SortOrder
    isApproved?: SortOrder
    approvedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    consultation?: ConsultationOrderByWithRelationInput
    patient?: PatientOrderByWithRelationInput
  }

  export type ReferralWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    consultationId?: string
    AND?: ReferralWhereInput | ReferralWhereInput[]
    OR?: ReferralWhereInput[]
    NOT?: ReferralWhereInput | ReferralWhereInput[]
    patientId?: StringFilter<"Referral"> | string
    specialty?: StringFilter<"Referral"> | string
    reason?: StringFilter<"Referral"> | string
    urgency?: EnumUrgencyFilter<"Referral"> | $Enums.Urgency
    notes?: StringNullableFilter<"Referral"> | string | null
    isApproved?: BoolFilter<"Referral"> | boolean
    approvedAt?: DateTimeNullableFilter<"Referral"> | Date | string | null
    createdAt?: DateTimeFilter<"Referral"> | Date | string
    updatedAt?: DateTimeFilter<"Referral"> | Date | string
    consultation?: XOR<ConsultationScalarRelationFilter, ConsultationWhereInput>
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
  }, "id" | "consultationId">

  export type ReferralOrderByWithAggregationInput = {
    id?: SortOrder
    consultationId?: SortOrder
    patientId?: SortOrder
    specialty?: SortOrder
    reason?: SortOrder
    urgency?: SortOrder
    notes?: SortOrderInput | SortOrder
    isApproved?: SortOrder
    approvedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ReferralCountOrderByAggregateInput
    _max?: ReferralMaxOrderByAggregateInput
    _min?: ReferralMinOrderByAggregateInput
  }

  export type ReferralScalarWhereWithAggregatesInput = {
    AND?: ReferralScalarWhereWithAggregatesInput | ReferralScalarWhereWithAggregatesInput[]
    OR?: ReferralScalarWhereWithAggregatesInput[]
    NOT?: ReferralScalarWhereWithAggregatesInput | ReferralScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Referral"> | string
    consultationId?: StringWithAggregatesFilter<"Referral"> | string
    patientId?: StringWithAggregatesFilter<"Referral"> | string
    specialty?: StringWithAggregatesFilter<"Referral"> | string
    reason?: StringWithAggregatesFilter<"Referral"> | string
    urgency?: EnumUrgencyWithAggregatesFilter<"Referral"> | $Enums.Urgency
    notes?: StringNullableWithAggregatesFilter<"Referral"> | string | null
    isApproved?: BoolWithAggregatesFilter<"Referral"> | boolean
    approvedAt?: DateTimeNullableWithAggregatesFilter<"Referral"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Referral"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Referral"> | Date | string
  }

  export type AppointmentWhereInput = {
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    id?: StringFilter<"Appointment"> | string
    consultationId?: StringFilter<"Appointment"> | string
    patientId?: StringFilter<"Appointment"> | string
    scheduledAt?: DateTimeFilter<"Appointment"> | Date | string
    type?: EnumAppointmentTypeFilter<"Appointment"> | $Enums.AppointmentType
    reason?: StringNullableFilter<"Appointment"> | string | null
    isApproved?: BoolFilter<"Appointment"> | boolean
    approvedAt?: DateTimeNullableFilter<"Appointment"> | Date | string | null
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
    consultation?: XOR<ConsultationScalarRelationFilter, ConsultationWhereInput>
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
  }

  export type AppointmentOrderByWithRelationInput = {
    id?: SortOrder
    consultationId?: SortOrder
    patientId?: SortOrder
    scheduledAt?: SortOrder
    type?: SortOrder
    reason?: SortOrderInput | SortOrder
    isApproved?: SortOrder
    approvedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    consultation?: ConsultationOrderByWithRelationInput
    patient?: PatientOrderByWithRelationInput
  }

  export type AppointmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    consultationId?: string
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    patientId?: StringFilter<"Appointment"> | string
    scheduledAt?: DateTimeFilter<"Appointment"> | Date | string
    type?: EnumAppointmentTypeFilter<"Appointment"> | $Enums.AppointmentType
    reason?: StringNullableFilter<"Appointment"> | string | null
    isApproved?: BoolFilter<"Appointment"> | boolean
    approvedAt?: DateTimeNullableFilter<"Appointment"> | Date | string | null
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
    consultation?: XOR<ConsultationScalarRelationFilter, ConsultationWhereInput>
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
  }, "id" | "consultationId">

  export type AppointmentOrderByWithAggregationInput = {
    id?: SortOrder
    consultationId?: SortOrder
    patientId?: SortOrder
    scheduledAt?: SortOrder
    type?: SortOrder
    reason?: SortOrderInput | SortOrder
    isApproved?: SortOrder
    approvedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AppointmentCountOrderByAggregateInput
    _max?: AppointmentMaxOrderByAggregateInput
    _min?: AppointmentMinOrderByAggregateInput
  }

  export type AppointmentScalarWhereWithAggregatesInput = {
    AND?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    OR?: AppointmentScalarWhereWithAggregatesInput[]
    NOT?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Appointment"> | string
    consultationId?: StringWithAggregatesFilter<"Appointment"> | string
    patientId?: StringWithAggregatesFilter<"Appointment"> | string
    scheduledAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    type?: EnumAppointmentTypeWithAggregatesFilter<"Appointment"> | $Enums.AppointmentType
    reason?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    isApproved?: BoolWithAggregatesFilter<"Appointment"> | boolean
    approvedAt?: DateTimeNullableWithAggregatesFilter<"Appointment"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    userId?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    resourceType?: StringFilter<"AuditLog"> | string
    resourceId?: StringFilter<"AuditLog"> | string
    metadata?: JsonNullableFilter<"AuditLog">
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    resourceType?: SortOrder
    resourceId?: SortOrder
    metadata?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    userId?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    resourceType?: StringFilter<"AuditLog"> | string
    resourceId?: StringFilter<"AuditLog"> | string
    metadata?: JsonNullableFilter<"AuditLog">
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    resourceType?: SortOrder
    resourceId?: SortOrder
    metadata?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    userId?: StringWithAggregatesFilter<"AuditLog"> | string
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    resourceType?: StringWithAggregatesFilter<"AuditLog"> | string
    resourceId?: StringWithAggregatesFilter<"AuditLog"> | string
    metadata?: JsonNullableWithAggregatesFilter<"AuditLog">
    ipAddress?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    timestamp?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name: string
    passwordHash: string
    role?: $Enums.UserRole
    specialty?: string | null
    licenseNumber?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    consultations?: ConsultationCreateNestedManyWithoutDoctorInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name: string
    passwordHash: string
    role?: $Enums.UserRole
    specialty?: string | null
    licenseNumber?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    consultations?: ConsultationUncheckedCreateNestedManyWithoutDoctorInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    specialty?: NullableStringFieldUpdateOperationsInput | string | null
    licenseNumber?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consultations?: ConsultationUpdateManyWithoutDoctorNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    specialty?: NullableStringFieldUpdateOperationsInput | string | null
    licenseNumber?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consultations?: ConsultationUncheckedUpdateManyWithoutDoctorNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name: string
    passwordHash: string
    role?: $Enums.UserRole
    specialty?: string | null
    licenseNumber?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    specialty?: NullableStringFieldUpdateOperationsInput | string | null
    licenseNumber?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    specialty?: NullableStringFieldUpdateOperationsInput | string | null
    licenseNumber?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientCreateInput = {
    id?: string
    mrn: string
    firstName: string
    lastName: string
    dob: Date | string
    gender: $Enums.Gender
    phone?: string | null
    email?: string | null
    address?: string | null
    allergies?: PatientCreateallergiesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    consultations?: ConsultationCreateNestedManyWithoutPatientInput
    prescriptions?: PrescriptionCreateNestedManyWithoutPatientInput
    referrals?: ReferralCreateNestedManyWithoutPatientInput
    appointments?: AppointmentCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateInput = {
    id?: string
    mrn: string
    firstName: string
    lastName: string
    dob: Date | string
    gender: $Enums.Gender
    phone?: string | null
    email?: string | null
    address?: string | null
    allergies?: PatientCreateallergiesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    consultations?: ConsultationUncheckedCreateNestedManyWithoutPatientInput
    prescriptions?: PrescriptionUncheckedCreateNestedManyWithoutPatientInput
    referrals?: ReferralUncheckedCreateNestedManyWithoutPatientInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    mrn?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    dob?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: PatientUpdateallergiesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consultations?: ConsultationUpdateManyWithoutPatientNestedInput
    prescriptions?: PrescriptionUpdateManyWithoutPatientNestedInput
    referrals?: ReferralUpdateManyWithoutPatientNestedInput
    appointments?: AppointmentUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    mrn?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    dob?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: PatientUpdateallergiesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consultations?: ConsultationUncheckedUpdateManyWithoutPatientNestedInput
    prescriptions?: PrescriptionUncheckedUpdateManyWithoutPatientNestedInput
    referrals?: ReferralUncheckedUpdateManyWithoutPatientNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type PatientCreateManyInput = {
    id?: string
    mrn: string
    firstName: string
    lastName: string
    dob: Date | string
    gender: $Enums.Gender
    phone?: string | null
    email?: string | null
    address?: string | null
    allergies?: PatientCreateallergiesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PatientUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    mrn?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    dob?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: PatientUpdateallergiesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    mrn?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    dob?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: PatientUpdateallergiesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsultationCreateInput = {
    id?: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    status?: $Enums.ConsultationStatus
    audioUrl?: string | null
    duration?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: PatientCreateNestedOneWithoutConsultationsInput
    doctor: UserCreateNestedOneWithoutConsultationsInput
    transcripts?: TranscriptCreateNestedManyWithoutConsultationInput
    soapNote?: SOAPNoteCreateNestedOneWithoutConsultationInput
    prescription?: PrescriptionCreateNestedOneWithoutConsultationInput
    referral?: ReferralCreateNestedOneWithoutConsultationInput
    appointment?: AppointmentCreateNestedOneWithoutConsultationInput
  }

  export type ConsultationUncheckedCreateInput = {
    id?: string
    patientId: string
    doctorId: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    status?: $Enums.ConsultationStatus
    audioUrl?: string | null
    duration?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transcripts?: TranscriptUncheckedCreateNestedManyWithoutConsultationInput
    soapNote?: SOAPNoteUncheckedCreateNestedOneWithoutConsultationInput
    prescription?: PrescriptionUncheckedCreateNestedOneWithoutConsultationInput
    referral?: ReferralUncheckedCreateNestedOneWithoutConsultationInput
    appointment?: AppointmentUncheckedCreateNestedOneWithoutConsultationInput
  }

  export type ConsultationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumConsultationStatusFieldUpdateOperationsInput | $Enums.ConsultationStatus
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutConsultationsNestedInput
    doctor?: UserUpdateOneRequiredWithoutConsultationsNestedInput
    transcripts?: TranscriptUpdateManyWithoutConsultationNestedInput
    soapNote?: SOAPNoteUpdateOneWithoutConsultationNestedInput
    prescription?: PrescriptionUpdateOneWithoutConsultationNestedInput
    referral?: ReferralUpdateOneWithoutConsultationNestedInput
    appointment?: AppointmentUpdateOneWithoutConsultationNestedInput
  }

  export type ConsultationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumConsultationStatusFieldUpdateOperationsInput | $Enums.ConsultationStatus
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transcripts?: TranscriptUncheckedUpdateManyWithoutConsultationNestedInput
    soapNote?: SOAPNoteUncheckedUpdateOneWithoutConsultationNestedInput
    prescription?: PrescriptionUncheckedUpdateOneWithoutConsultationNestedInput
    referral?: ReferralUncheckedUpdateOneWithoutConsultationNestedInput
    appointment?: AppointmentUncheckedUpdateOneWithoutConsultationNestedInput
  }

  export type ConsultationCreateManyInput = {
    id?: string
    patientId: string
    doctorId: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    status?: $Enums.ConsultationStatus
    audioUrl?: string | null
    duration?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConsultationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumConsultationStatusFieldUpdateOperationsInput | $Enums.ConsultationStatus
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsultationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumConsultationStatusFieldUpdateOperationsInput | $Enums.ConsultationStatus
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TranscriptCreateInput = {
    id?: string
    text: string
    speaker: $Enums.Speaker
    timestamp?: Date | string
    confidence?: number | null
    consultation: ConsultationCreateNestedOneWithoutTranscriptsInput
  }

  export type TranscriptUncheckedCreateInput = {
    id?: string
    consultationId: string
    text: string
    speaker: $Enums.Speaker
    timestamp?: Date | string
    confidence?: number | null
  }

  export type TranscriptUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    speaker?: EnumSpeakerFieldUpdateOperationsInput | $Enums.Speaker
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    consultation?: ConsultationUpdateOneRequiredWithoutTranscriptsNestedInput
  }

  export type TranscriptUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    consultationId?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    speaker?: EnumSpeakerFieldUpdateOperationsInput | $Enums.Speaker
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type TranscriptCreateManyInput = {
    id?: string
    consultationId: string
    text: string
    speaker: $Enums.Speaker
    timestamp?: Date | string
    confidence?: number | null
  }

  export type TranscriptUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    speaker?: EnumSpeakerFieldUpdateOperationsInput | $Enums.Speaker
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type TranscriptUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    consultationId?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    speaker?: EnumSpeakerFieldUpdateOperationsInput | $Enums.Speaker
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type SOAPNoteCreateInput = {
    id?: string
    subjective: string
    objective: string
    assessment: string
    plan: string
    isApproved?: boolean
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    consultation: ConsultationCreateNestedOneWithoutSoapNoteInput
  }

  export type SOAPNoteUncheckedCreateInput = {
    id?: string
    consultationId: string
    subjective: string
    objective: string
    assessment: string
    plan: string
    isApproved?: boolean
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SOAPNoteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    subjective?: StringFieldUpdateOperationsInput | string
    objective?: StringFieldUpdateOperationsInput | string
    assessment?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consultation?: ConsultationUpdateOneRequiredWithoutSoapNoteNestedInput
  }

  export type SOAPNoteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    consultationId?: StringFieldUpdateOperationsInput | string
    subjective?: StringFieldUpdateOperationsInput | string
    objective?: StringFieldUpdateOperationsInput | string
    assessment?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SOAPNoteCreateManyInput = {
    id?: string
    consultationId: string
    subjective: string
    objective: string
    assessment: string
    plan: string
    isApproved?: boolean
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SOAPNoteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    subjective?: StringFieldUpdateOperationsInput | string
    objective?: StringFieldUpdateOperationsInput | string
    assessment?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SOAPNoteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    consultationId?: StringFieldUpdateOperationsInput | string
    subjective?: StringFieldUpdateOperationsInput | string
    objective?: StringFieldUpdateOperationsInput | string
    assessment?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrescriptionCreateInput = {
    id?: string
    medications: JsonNullValueInput | InputJsonValue
    instructions?: string | null
    isApproved?: boolean
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    consultation: ConsultationCreateNestedOneWithoutPrescriptionInput
    patient: PatientCreateNestedOneWithoutPrescriptionsInput
  }

  export type PrescriptionUncheckedCreateInput = {
    id?: string
    consultationId: string
    patientId: string
    medications: JsonNullValueInput | InputJsonValue
    instructions?: string | null
    isApproved?: boolean
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PrescriptionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    medications?: JsonNullValueInput | InputJsonValue
    instructions?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consultation?: ConsultationUpdateOneRequiredWithoutPrescriptionNestedInput
    patient?: PatientUpdateOneRequiredWithoutPrescriptionsNestedInput
  }

  export type PrescriptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    consultationId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    medications?: JsonNullValueInput | InputJsonValue
    instructions?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrescriptionCreateManyInput = {
    id?: string
    consultationId: string
    patientId: string
    medications: JsonNullValueInput | InputJsonValue
    instructions?: string | null
    isApproved?: boolean
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PrescriptionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    medications?: JsonNullValueInput | InputJsonValue
    instructions?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrescriptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    consultationId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    medications?: JsonNullValueInput | InputJsonValue
    instructions?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReferralCreateInput = {
    id?: string
    specialty: string
    reason: string
    urgency?: $Enums.Urgency
    notes?: string | null
    isApproved?: boolean
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    consultation: ConsultationCreateNestedOneWithoutReferralInput
    patient: PatientCreateNestedOneWithoutReferralsInput
  }

  export type ReferralUncheckedCreateInput = {
    id?: string
    consultationId: string
    patientId: string
    specialty: string
    reason: string
    urgency?: $Enums.Urgency
    notes?: string | null
    isApproved?: boolean
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReferralUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    urgency?: EnumUrgencyFieldUpdateOperationsInput | $Enums.Urgency
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consultation?: ConsultationUpdateOneRequiredWithoutReferralNestedInput
    patient?: PatientUpdateOneRequiredWithoutReferralsNestedInput
  }

  export type ReferralUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    consultationId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    urgency?: EnumUrgencyFieldUpdateOperationsInput | $Enums.Urgency
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReferralCreateManyInput = {
    id?: string
    consultationId: string
    patientId: string
    specialty: string
    reason: string
    urgency?: $Enums.Urgency
    notes?: string | null
    isApproved?: boolean
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReferralUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    urgency?: EnumUrgencyFieldUpdateOperationsInput | $Enums.Urgency
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReferralUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    consultationId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    urgency?: EnumUrgencyFieldUpdateOperationsInput | $Enums.Urgency
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentCreateInput = {
    id?: string
    scheduledAt: Date | string
    type: $Enums.AppointmentType
    reason?: string | null
    isApproved?: boolean
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    consultation: ConsultationCreateNestedOneWithoutAppointmentInput
    patient: PatientCreateNestedOneWithoutAppointmentsInput
  }

  export type AppointmentUncheckedCreateInput = {
    id?: string
    consultationId: string
    patientId: string
    scheduledAt: Date | string
    type: $Enums.AppointmentType
    reason?: string | null
    isApproved?: boolean
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumAppointmentTypeFieldUpdateOperationsInput | $Enums.AppointmentType
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consultation?: ConsultationUpdateOneRequiredWithoutAppointmentNestedInput
    patient?: PatientUpdateOneRequiredWithoutAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    consultationId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumAppointmentTypeFieldUpdateOperationsInput | $Enums.AppointmentType
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentCreateManyInput = {
    id?: string
    consultationId: string
    patientId: string
    scheduledAt: Date | string
    type: $Enums.AppointmentType
    reason?: string | null
    isApproved?: boolean
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumAppointmentTypeFieldUpdateOperationsInput | $Enums.AppointmentType
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    consultationId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumAppointmentTypeFieldUpdateOperationsInput | $Enums.AppointmentType
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    id?: string
    action: string
    resourceType: string
    resourceId: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    timestamp?: Date | string
    user: UserCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    userId: string
    action: string
    resourceType: string
    resourceId: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    timestamp?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resourceType?: StringFieldUpdateOperationsInput | string
    resourceId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resourceType?: StringFieldUpdateOperationsInput | string
    resourceId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    userId: string
    action: string
    resourceType: string
    resourceId: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    timestamp?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resourceType?: StringFieldUpdateOperationsInput | string
    resourceId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resourceType?: StringFieldUpdateOperationsInput | string
    resourceId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ConsultationListRelationFilter = {
    every?: ConsultationWhereInput
    some?: ConsultationWhereInput
    none?: ConsultationWhereInput
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ConsultationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    specialty?: SortOrder
    licenseNumber?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    specialty?: SortOrder
    licenseNumber?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    specialty?: SortOrder
    licenseNumber?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumGenderFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderFilter<$PrismaModel> | $Enums.Gender
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type PrescriptionListRelationFilter = {
    every?: PrescriptionWhereInput
    some?: PrescriptionWhereInput
    none?: PrescriptionWhereInput
  }

  export type ReferralListRelationFilter = {
    every?: ReferralWhereInput
    some?: ReferralWhereInput
    none?: ReferralWhereInput
  }

  export type AppointmentListRelationFilter = {
    every?: AppointmentWhereInput
    some?: AppointmentWhereInput
    none?: AppointmentWhereInput
  }

  export type PrescriptionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReferralOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AppointmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PatientCountOrderByAggregateInput = {
    id?: SortOrder
    mrn?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    dob?: SortOrder
    gender?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    address?: SortOrder
    allergies?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PatientMaxOrderByAggregateInput = {
    id?: SortOrder
    mrn?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    dob?: SortOrder
    gender?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    address?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PatientMinOrderByAggregateInput = {
    id?: SortOrder
    mrn?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    dob?: SortOrder
    gender?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    address?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumGenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderWithAggregatesFilter<$PrismaModel> | $Enums.Gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenderFilter<$PrismaModel>
    _max?: NestedEnumGenderFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnumConsultationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ConsultationStatus | EnumConsultationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConsultationStatus[] | ListEnumConsultationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConsultationStatus[] | ListEnumConsultationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumConsultationStatusFilter<$PrismaModel> | $Enums.ConsultationStatus
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type PatientScalarRelationFilter = {
    is?: PatientWhereInput
    isNot?: PatientWhereInput
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type TranscriptListRelationFilter = {
    every?: TranscriptWhereInput
    some?: TranscriptWhereInput
    none?: TranscriptWhereInput
  }

  export type SOAPNoteNullableScalarRelationFilter = {
    is?: SOAPNoteWhereInput | null
    isNot?: SOAPNoteWhereInput | null
  }

  export type PrescriptionNullableScalarRelationFilter = {
    is?: PrescriptionWhereInput | null
    isNot?: PrescriptionWhereInput | null
  }

  export type ReferralNullableScalarRelationFilter = {
    is?: ReferralWhereInput | null
    isNot?: ReferralWhereInput | null
  }

  export type AppointmentNullableScalarRelationFilter = {
    is?: AppointmentWhereInput | null
    isNot?: AppointmentWhereInput | null
  }

  export type TranscriptOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ConsultationCountOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    doctorId?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    status?: SortOrder
    audioUrl?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConsultationAvgOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type ConsultationMaxOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    doctorId?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    status?: SortOrder
    audioUrl?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConsultationMinOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    doctorId?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    status?: SortOrder
    audioUrl?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConsultationSumOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumConsultationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConsultationStatus | EnumConsultationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConsultationStatus[] | ListEnumConsultationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConsultationStatus[] | ListEnumConsultationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumConsultationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ConsultationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConsultationStatusFilter<$PrismaModel>
    _max?: NestedEnumConsultationStatusFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumSpeakerFilter<$PrismaModel = never> = {
    equals?: $Enums.Speaker | EnumSpeakerFieldRefInput<$PrismaModel>
    in?: $Enums.Speaker[] | ListEnumSpeakerFieldRefInput<$PrismaModel>
    notIn?: $Enums.Speaker[] | ListEnumSpeakerFieldRefInput<$PrismaModel>
    not?: NestedEnumSpeakerFilter<$PrismaModel> | $Enums.Speaker
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type ConsultationScalarRelationFilter = {
    is?: ConsultationWhereInput
    isNot?: ConsultationWhereInput
  }

  export type TranscriptCountOrderByAggregateInput = {
    id?: SortOrder
    consultationId?: SortOrder
    text?: SortOrder
    speaker?: SortOrder
    timestamp?: SortOrder
    confidence?: SortOrder
  }

  export type TranscriptAvgOrderByAggregateInput = {
    confidence?: SortOrder
  }

  export type TranscriptMaxOrderByAggregateInput = {
    id?: SortOrder
    consultationId?: SortOrder
    text?: SortOrder
    speaker?: SortOrder
    timestamp?: SortOrder
    confidence?: SortOrder
  }

  export type TranscriptMinOrderByAggregateInput = {
    id?: SortOrder
    consultationId?: SortOrder
    text?: SortOrder
    speaker?: SortOrder
    timestamp?: SortOrder
    confidence?: SortOrder
  }

  export type TranscriptSumOrderByAggregateInput = {
    confidence?: SortOrder
  }

  export type EnumSpeakerWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Speaker | EnumSpeakerFieldRefInput<$PrismaModel>
    in?: $Enums.Speaker[] | ListEnumSpeakerFieldRefInput<$PrismaModel>
    notIn?: $Enums.Speaker[] | ListEnumSpeakerFieldRefInput<$PrismaModel>
    not?: NestedEnumSpeakerWithAggregatesFilter<$PrismaModel> | $Enums.Speaker
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSpeakerFilter<$PrismaModel>
    _max?: NestedEnumSpeakerFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type SOAPNoteCountOrderByAggregateInput = {
    id?: SortOrder
    consultationId?: SortOrder
    subjective?: SortOrder
    objective?: SortOrder
    assessment?: SortOrder
    plan?: SortOrder
    isApproved?: SortOrder
    approvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SOAPNoteMaxOrderByAggregateInput = {
    id?: SortOrder
    consultationId?: SortOrder
    subjective?: SortOrder
    objective?: SortOrder
    assessment?: SortOrder
    plan?: SortOrder
    isApproved?: SortOrder
    approvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SOAPNoteMinOrderByAggregateInput = {
    id?: SortOrder
    consultationId?: SortOrder
    subjective?: SortOrder
    objective?: SortOrder
    assessment?: SortOrder
    plan?: SortOrder
    isApproved?: SortOrder
    approvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type PrescriptionCountOrderByAggregateInput = {
    id?: SortOrder
    consultationId?: SortOrder
    patientId?: SortOrder
    medications?: SortOrder
    instructions?: SortOrder
    isApproved?: SortOrder
    approvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PrescriptionMaxOrderByAggregateInput = {
    id?: SortOrder
    consultationId?: SortOrder
    patientId?: SortOrder
    instructions?: SortOrder
    isApproved?: SortOrder
    approvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PrescriptionMinOrderByAggregateInput = {
    id?: SortOrder
    consultationId?: SortOrder
    patientId?: SortOrder
    instructions?: SortOrder
    isApproved?: SortOrder
    approvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type EnumUrgencyFilter<$PrismaModel = never> = {
    equals?: $Enums.Urgency | EnumUrgencyFieldRefInput<$PrismaModel>
    in?: $Enums.Urgency[] | ListEnumUrgencyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Urgency[] | ListEnumUrgencyFieldRefInput<$PrismaModel>
    not?: NestedEnumUrgencyFilter<$PrismaModel> | $Enums.Urgency
  }

  export type ReferralCountOrderByAggregateInput = {
    id?: SortOrder
    consultationId?: SortOrder
    patientId?: SortOrder
    specialty?: SortOrder
    reason?: SortOrder
    urgency?: SortOrder
    notes?: SortOrder
    isApproved?: SortOrder
    approvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReferralMaxOrderByAggregateInput = {
    id?: SortOrder
    consultationId?: SortOrder
    patientId?: SortOrder
    specialty?: SortOrder
    reason?: SortOrder
    urgency?: SortOrder
    notes?: SortOrder
    isApproved?: SortOrder
    approvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReferralMinOrderByAggregateInput = {
    id?: SortOrder
    consultationId?: SortOrder
    patientId?: SortOrder
    specialty?: SortOrder
    reason?: SortOrder
    urgency?: SortOrder
    notes?: SortOrder
    isApproved?: SortOrder
    approvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumUrgencyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Urgency | EnumUrgencyFieldRefInput<$PrismaModel>
    in?: $Enums.Urgency[] | ListEnumUrgencyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Urgency[] | ListEnumUrgencyFieldRefInput<$PrismaModel>
    not?: NestedEnumUrgencyWithAggregatesFilter<$PrismaModel> | $Enums.Urgency
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUrgencyFilter<$PrismaModel>
    _max?: NestedEnumUrgencyFilter<$PrismaModel>
  }

  export type EnumAppointmentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentType | EnumAppointmentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentType[] | ListEnumAppointmentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentType[] | ListEnumAppointmentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentTypeFilter<$PrismaModel> | $Enums.AppointmentType
  }

  export type AppointmentCountOrderByAggregateInput = {
    id?: SortOrder
    consultationId?: SortOrder
    patientId?: SortOrder
    scheduledAt?: SortOrder
    type?: SortOrder
    reason?: SortOrder
    isApproved?: SortOrder
    approvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppointmentMaxOrderByAggregateInput = {
    id?: SortOrder
    consultationId?: SortOrder
    patientId?: SortOrder
    scheduledAt?: SortOrder
    type?: SortOrder
    reason?: SortOrder
    isApproved?: SortOrder
    approvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppointmentMinOrderByAggregateInput = {
    id?: SortOrder
    consultationId?: SortOrder
    patientId?: SortOrder
    scheduledAt?: SortOrder
    type?: SortOrder
    reason?: SortOrder
    isApproved?: SortOrder
    approvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumAppointmentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentType | EnumAppointmentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentType[] | ListEnumAppointmentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentType[] | ListEnumAppointmentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentTypeWithAggregatesFilter<$PrismaModel> | $Enums.AppointmentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAppointmentTypeFilter<$PrismaModel>
    _max?: NestedEnumAppointmentTypeFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    resourceType?: SortOrder
    resourceId?: SortOrder
    metadata?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    timestamp?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    resourceType?: SortOrder
    resourceId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    timestamp?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    resourceType?: SortOrder
    resourceId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    timestamp?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type ConsultationCreateNestedManyWithoutDoctorInput = {
    create?: XOR<ConsultationCreateWithoutDoctorInput, ConsultationUncheckedCreateWithoutDoctorInput> | ConsultationCreateWithoutDoctorInput[] | ConsultationUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: ConsultationCreateOrConnectWithoutDoctorInput | ConsultationCreateOrConnectWithoutDoctorInput[]
    createMany?: ConsultationCreateManyDoctorInputEnvelope
    connect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type ConsultationUncheckedCreateNestedManyWithoutDoctorInput = {
    create?: XOR<ConsultationCreateWithoutDoctorInput, ConsultationUncheckedCreateWithoutDoctorInput> | ConsultationCreateWithoutDoctorInput[] | ConsultationUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: ConsultationCreateOrConnectWithoutDoctorInput | ConsultationCreateOrConnectWithoutDoctorInput[]
    createMany?: ConsultationCreateManyDoctorInputEnvelope
    connect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ConsultationUpdateManyWithoutDoctorNestedInput = {
    create?: XOR<ConsultationCreateWithoutDoctorInput, ConsultationUncheckedCreateWithoutDoctorInput> | ConsultationCreateWithoutDoctorInput[] | ConsultationUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: ConsultationCreateOrConnectWithoutDoctorInput | ConsultationCreateOrConnectWithoutDoctorInput[]
    upsert?: ConsultationUpsertWithWhereUniqueWithoutDoctorInput | ConsultationUpsertWithWhereUniqueWithoutDoctorInput[]
    createMany?: ConsultationCreateManyDoctorInputEnvelope
    set?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    disconnect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    delete?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    connect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    update?: ConsultationUpdateWithWhereUniqueWithoutDoctorInput | ConsultationUpdateWithWhereUniqueWithoutDoctorInput[]
    updateMany?: ConsultationUpdateManyWithWhereWithoutDoctorInput | ConsultationUpdateManyWithWhereWithoutDoctorInput[]
    deleteMany?: ConsultationScalarWhereInput | ConsultationScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type ConsultationUncheckedUpdateManyWithoutDoctorNestedInput = {
    create?: XOR<ConsultationCreateWithoutDoctorInput, ConsultationUncheckedCreateWithoutDoctorInput> | ConsultationCreateWithoutDoctorInput[] | ConsultationUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: ConsultationCreateOrConnectWithoutDoctorInput | ConsultationCreateOrConnectWithoutDoctorInput[]
    upsert?: ConsultationUpsertWithWhereUniqueWithoutDoctorInput | ConsultationUpsertWithWhereUniqueWithoutDoctorInput[]
    createMany?: ConsultationCreateManyDoctorInputEnvelope
    set?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    disconnect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    delete?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    connect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    update?: ConsultationUpdateWithWhereUniqueWithoutDoctorInput | ConsultationUpdateWithWhereUniqueWithoutDoctorInput[]
    updateMany?: ConsultationUpdateManyWithWhereWithoutDoctorInput | ConsultationUpdateManyWithWhereWithoutDoctorInput[]
    deleteMany?: ConsultationScalarWhereInput | ConsultationScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type PatientCreateallergiesInput = {
    set: string[]
  }

  export type ConsultationCreateNestedManyWithoutPatientInput = {
    create?: XOR<ConsultationCreateWithoutPatientInput, ConsultationUncheckedCreateWithoutPatientInput> | ConsultationCreateWithoutPatientInput[] | ConsultationUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: ConsultationCreateOrConnectWithoutPatientInput | ConsultationCreateOrConnectWithoutPatientInput[]
    createMany?: ConsultationCreateManyPatientInputEnvelope
    connect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
  }

  export type PrescriptionCreateNestedManyWithoutPatientInput = {
    create?: XOR<PrescriptionCreateWithoutPatientInput, PrescriptionUncheckedCreateWithoutPatientInput> | PrescriptionCreateWithoutPatientInput[] | PrescriptionUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: PrescriptionCreateOrConnectWithoutPatientInput | PrescriptionCreateOrConnectWithoutPatientInput[]
    createMany?: PrescriptionCreateManyPatientInputEnvelope
    connect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
  }

  export type ReferralCreateNestedManyWithoutPatientInput = {
    create?: XOR<ReferralCreateWithoutPatientInput, ReferralUncheckedCreateWithoutPatientInput> | ReferralCreateWithoutPatientInput[] | ReferralUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: ReferralCreateOrConnectWithoutPatientInput | ReferralCreateOrConnectWithoutPatientInput[]
    createMany?: ReferralCreateManyPatientInputEnvelope
    connect?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[]
  }

  export type AppointmentCreateNestedManyWithoutPatientInput = {
    create?: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput> | AppointmentCreateWithoutPatientInput[] | AppointmentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutPatientInput | AppointmentCreateOrConnectWithoutPatientInput[]
    createMany?: AppointmentCreateManyPatientInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type ConsultationUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<ConsultationCreateWithoutPatientInput, ConsultationUncheckedCreateWithoutPatientInput> | ConsultationCreateWithoutPatientInput[] | ConsultationUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: ConsultationCreateOrConnectWithoutPatientInput | ConsultationCreateOrConnectWithoutPatientInput[]
    createMany?: ConsultationCreateManyPatientInputEnvelope
    connect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
  }

  export type PrescriptionUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<PrescriptionCreateWithoutPatientInput, PrescriptionUncheckedCreateWithoutPatientInput> | PrescriptionCreateWithoutPatientInput[] | PrescriptionUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: PrescriptionCreateOrConnectWithoutPatientInput | PrescriptionCreateOrConnectWithoutPatientInput[]
    createMany?: PrescriptionCreateManyPatientInputEnvelope
    connect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
  }

  export type ReferralUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<ReferralCreateWithoutPatientInput, ReferralUncheckedCreateWithoutPatientInput> | ReferralCreateWithoutPatientInput[] | ReferralUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: ReferralCreateOrConnectWithoutPatientInput | ReferralCreateOrConnectWithoutPatientInput[]
    createMany?: ReferralCreateManyPatientInputEnvelope
    connect?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[]
  }

  export type AppointmentUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput> | AppointmentCreateWithoutPatientInput[] | AppointmentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutPatientInput | AppointmentCreateOrConnectWithoutPatientInput[]
    createMany?: AppointmentCreateManyPatientInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type EnumGenderFieldUpdateOperationsInput = {
    set?: $Enums.Gender
  }

  export type PatientUpdateallergiesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ConsultationUpdateManyWithoutPatientNestedInput = {
    create?: XOR<ConsultationCreateWithoutPatientInput, ConsultationUncheckedCreateWithoutPatientInput> | ConsultationCreateWithoutPatientInput[] | ConsultationUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: ConsultationCreateOrConnectWithoutPatientInput | ConsultationCreateOrConnectWithoutPatientInput[]
    upsert?: ConsultationUpsertWithWhereUniqueWithoutPatientInput | ConsultationUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: ConsultationCreateManyPatientInputEnvelope
    set?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    disconnect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    delete?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    connect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    update?: ConsultationUpdateWithWhereUniqueWithoutPatientInput | ConsultationUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: ConsultationUpdateManyWithWhereWithoutPatientInput | ConsultationUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: ConsultationScalarWhereInput | ConsultationScalarWhereInput[]
  }

  export type PrescriptionUpdateManyWithoutPatientNestedInput = {
    create?: XOR<PrescriptionCreateWithoutPatientInput, PrescriptionUncheckedCreateWithoutPatientInput> | PrescriptionCreateWithoutPatientInput[] | PrescriptionUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: PrescriptionCreateOrConnectWithoutPatientInput | PrescriptionCreateOrConnectWithoutPatientInput[]
    upsert?: PrescriptionUpsertWithWhereUniqueWithoutPatientInput | PrescriptionUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: PrescriptionCreateManyPatientInputEnvelope
    set?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    disconnect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    delete?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    connect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    update?: PrescriptionUpdateWithWhereUniqueWithoutPatientInput | PrescriptionUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: PrescriptionUpdateManyWithWhereWithoutPatientInput | PrescriptionUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: PrescriptionScalarWhereInput | PrescriptionScalarWhereInput[]
  }

  export type ReferralUpdateManyWithoutPatientNestedInput = {
    create?: XOR<ReferralCreateWithoutPatientInput, ReferralUncheckedCreateWithoutPatientInput> | ReferralCreateWithoutPatientInput[] | ReferralUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: ReferralCreateOrConnectWithoutPatientInput | ReferralCreateOrConnectWithoutPatientInput[]
    upsert?: ReferralUpsertWithWhereUniqueWithoutPatientInput | ReferralUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: ReferralCreateManyPatientInputEnvelope
    set?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[]
    disconnect?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[]
    delete?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[]
    connect?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[]
    update?: ReferralUpdateWithWhereUniqueWithoutPatientInput | ReferralUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: ReferralUpdateManyWithWhereWithoutPatientInput | ReferralUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: ReferralScalarWhereInput | ReferralScalarWhereInput[]
  }

  export type AppointmentUpdateManyWithoutPatientNestedInput = {
    create?: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput> | AppointmentCreateWithoutPatientInput[] | AppointmentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutPatientInput | AppointmentCreateOrConnectWithoutPatientInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutPatientInput | AppointmentUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: AppointmentCreateManyPatientInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutPatientInput | AppointmentUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutPatientInput | AppointmentUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type ConsultationUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<ConsultationCreateWithoutPatientInput, ConsultationUncheckedCreateWithoutPatientInput> | ConsultationCreateWithoutPatientInput[] | ConsultationUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: ConsultationCreateOrConnectWithoutPatientInput | ConsultationCreateOrConnectWithoutPatientInput[]
    upsert?: ConsultationUpsertWithWhereUniqueWithoutPatientInput | ConsultationUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: ConsultationCreateManyPatientInputEnvelope
    set?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    disconnect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    delete?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    connect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    update?: ConsultationUpdateWithWhereUniqueWithoutPatientInput | ConsultationUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: ConsultationUpdateManyWithWhereWithoutPatientInput | ConsultationUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: ConsultationScalarWhereInput | ConsultationScalarWhereInput[]
  }

  export type PrescriptionUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<PrescriptionCreateWithoutPatientInput, PrescriptionUncheckedCreateWithoutPatientInput> | PrescriptionCreateWithoutPatientInput[] | PrescriptionUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: PrescriptionCreateOrConnectWithoutPatientInput | PrescriptionCreateOrConnectWithoutPatientInput[]
    upsert?: PrescriptionUpsertWithWhereUniqueWithoutPatientInput | PrescriptionUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: PrescriptionCreateManyPatientInputEnvelope
    set?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    disconnect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    delete?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    connect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    update?: PrescriptionUpdateWithWhereUniqueWithoutPatientInput | PrescriptionUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: PrescriptionUpdateManyWithWhereWithoutPatientInput | PrescriptionUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: PrescriptionScalarWhereInput | PrescriptionScalarWhereInput[]
  }

  export type ReferralUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<ReferralCreateWithoutPatientInput, ReferralUncheckedCreateWithoutPatientInput> | ReferralCreateWithoutPatientInput[] | ReferralUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: ReferralCreateOrConnectWithoutPatientInput | ReferralCreateOrConnectWithoutPatientInput[]
    upsert?: ReferralUpsertWithWhereUniqueWithoutPatientInput | ReferralUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: ReferralCreateManyPatientInputEnvelope
    set?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[]
    disconnect?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[]
    delete?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[]
    connect?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[]
    update?: ReferralUpdateWithWhereUniqueWithoutPatientInput | ReferralUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: ReferralUpdateManyWithWhereWithoutPatientInput | ReferralUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: ReferralScalarWhereInput | ReferralScalarWhereInput[]
  }

  export type AppointmentUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput> | AppointmentCreateWithoutPatientInput[] | AppointmentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutPatientInput | AppointmentCreateOrConnectWithoutPatientInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutPatientInput | AppointmentUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: AppointmentCreateManyPatientInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutPatientInput | AppointmentUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutPatientInput | AppointmentUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type PatientCreateNestedOneWithoutConsultationsInput = {
    create?: XOR<PatientCreateWithoutConsultationsInput, PatientUncheckedCreateWithoutConsultationsInput>
    connectOrCreate?: PatientCreateOrConnectWithoutConsultationsInput
    connect?: PatientWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutConsultationsInput = {
    create?: XOR<UserCreateWithoutConsultationsInput, UserUncheckedCreateWithoutConsultationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConsultationsInput
    connect?: UserWhereUniqueInput
  }

  export type TranscriptCreateNestedManyWithoutConsultationInput = {
    create?: XOR<TranscriptCreateWithoutConsultationInput, TranscriptUncheckedCreateWithoutConsultationInput> | TranscriptCreateWithoutConsultationInput[] | TranscriptUncheckedCreateWithoutConsultationInput[]
    connectOrCreate?: TranscriptCreateOrConnectWithoutConsultationInput | TranscriptCreateOrConnectWithoutConsultationInput[]
    createMany?: TranscriptCreateManyConsultationInputEnvelope
    connect?: TranscriptWhereUniqueInput | TranscriptWhereUniqueInput[]
  }

  export type SOAPNoteCreateNestedOneWithoutConsultationInput = {
    create?: XOR<SOAPNoteCreateWithoutConsultationInput, SOAPNoteUncheckedCreateWithoutConsultationInput>
    connectOrCreate?: SOAPNoteCreateOrConnectWithoutConsultationInput
    connect?: SOAPNoteWhereUniqueInput
  }

  export type PrescriptionCreateNestedOneWithoutConsultationInput = {
    create?: XOR<PrescriptionCreateWithoutConsultationInput, PrescriptionUncheckedCreateWithoutConsultationInput>
    connectOrCreate?: PrescriptionCreateOrConnectWithoutConsultationInput
    connect?: PrescriptionWhereUniqueInput
  }

  export type ReferralCreateNestedOneWithoutConsultationInput = {
    create?: XOR<ReferralCreateWithoutConsultationInput, ReferralUncheckedCreateWithoutConsultationInput>
    connectOrCreate?: ReferralCreateOrConnectWithoutConsultationInput
    connect?: ReferralWhereUniqueInput
  }

  export type AppointmentCreateNestedOneWithoutConsultationInput = {
    create?: XOR<AppointmentCreateWithoutConsultationInput, AppointmentUncheckedCreateWithoutConsultationInput>
    connectOrCreate?: AppointmentCreateOrConnectWithoutConsultationInput
    connect?: AppointmentWhereUniqueInput
  }

  export type TranscriptUncheckedCreateNestedManyWithoutConsultationInput = {
    create?: XOR<TranscriptCreateWithoutConsultationInput, TranscriptUncheckedCreateWithoutConsultationInput> | TranscriptCreateWithoutConsultationInput[] | TranscriptUncheckedCreateWithoutConsultationInput[]
    connectOrCreate?: TranscriptCreateOrConnectWithoutConsultationInput | TranscriptCreateOrConnectWithoutConsultationInput[]
    createMany?: TranscriptCreateManyConsultationInputEnvelope
    connect?: TranscriptWhereUniqueInput | TranscriptWhereUniqueInput[]
  }

  export type SOAPNoteUncheckedCreateNestedOneWithoutConsultationInput = {
    create?: XOR<SOAPNoteCreateWithoutConsultationInput, SOAPNoteUncheckedCreateWithoutConsultationInput>
    connectOrCreate?: SOAPNoteCreateOrConnectWithoutConsultationInput
    connect?: SOAPNoteWhereUniqueInput
  }

  export type PrescriptionUncheckedCreateNestedOneWithoutConsultationInput = {
    create?: XOR<PrescriptionCreateWithoutConsultationInput, PrescriptionUncheckedCreateWithoutConsultationInput>
    connectOrCreate?: PrescriptionCreateOrConnectWithoutConsultationInput
    connect?: PrescriptionWhereUniqueInput
  }

  export type ReferralUncheckedCreateNestedOneWithoutConsultationInput = {
    create?: XOR<ReferralCreateWithoutConsultationInput, ReferralUncheckedCreateWithoutConsultationInput>
    connectOrCreate?: ReferralCreateOrConnectWithoutConsultationInput
    connect?: ReferralWhereUniqueInput
  }

  export type AppointmentUncheckedCreateNestedOneWithoutConsultationInput = {
    create?: XOR<AppointmentCreateWithoutConsultationInput, AppointmentUncheckedCreateWithoutConsultationInput>
    connectOrCreate?: AppointmentCreateOrConnectWithoutConsultationInput
    connect?: AppointmentWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumConsultationStatusFieldUpdateOperationsInput = {
    set?: $Enums.ConsultationStatus
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PatientUpdateOneRequiredWithoutConsultationsNestedInput = {
    create?: XOR<PatientCreateWithoutConsultationsInput, PatientUncheckedCreateWithoutConsultationsInput>
    connectOrCreate?: PatientCreateOrConnectWithoutConsultationsInput
    upsert?: PatientUpsertWithoutConsultationsInput
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutConsultationsInput, PatientUpdateWithoutConsultationsInput>, PatientUncheckedUpdateWithoutConsultationsInput>
  }

  export type UserUpdateOneRequiredWithoutConsultationsNestedInput = {
    create?: XOR<UserCreateWithoutConsultationsInput, UserUncheckedCreateWithoutConsultationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConsultationsInput
    upsert?: UserUpsertWithoutConsultationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutConsultationsInput, UserUpdateWithoutConsultationsInput>, UserUncheckedUpdateWithoutConsultationsInput>
  }

  export type TranscriptUpdateManyWithoutConsultationNestedInput = {
    create?: XOR<TranscriptCreateWithoutConsultationInput, TranscriptUncheckedCreateWithoutConsultationInput> | TranscriptCreateWithoutConsultationInput[] | TranscriptUncheckedCreateWithoutConsultationInput[]
    connectOrCreate?: TranscriptCreateOrConnectWithoutConsultationInput | TranscriptCreateOrConnectWithoutConsultationInput[]
    upsert?: TranscriptUpsertWithWhereUniqueWithoutConsultationInput | TranscriptUpsertWithWhereUniqueWithoutConsultationInput[]
    createMany?: TranscriptCreateManyConsultationInputEnvelope
    set?: TranscriptWhereUniqueInput | TranscriptWhereUniqueInput[]
    disconnect?: TranscriptWhereUniqueInput | TranscriptWhereUniqueInput[]
    delete?: TranscriptWhereUniqueInput | TranscriptWhereUniqueInput[]
    connect?: TranscriptWhereUniqueInput | TranscriptWhereUniqueInput[]
    update?: TranscriptUpdateWithWhereUniqueWithoutConsultationInput | TranscriptUpdateWithWhereUniqueWithoutConsultationInput[]
    updateMany?: TranscriptUpdateManyWithWhereWithoutConsultationInput | TranscriptUpdateManyWithWhereWithoutConsultationInput[]
    deleteMany?: TranscriptScalarWhereInput | TranscriptScalarWhereInput[]
  }

  export type SOAPNoteUpdateOneWithoutConsultationNestedInput = {
    create?: XOR<SOAPNoteCreateWithoutConsultationInput, SOAPNoteUncheckedCreateWithoutConsultationInput>
    connectOrCreate?: SOAPNoteCreateOrConnectWithoutConsultationInput
    upsert?: SOAPNoteUpsertWithoutConsultationInput
    disconnect?: SOAPNoteWhereInput | boolean
    delete?: SOAPNoteWhereInput | boolean
    connect?: SOAPNoteWhereUniqueInput
    update?: XOR<XOR<SOAPNoteUpdateToOneWithWhereWithoutConsultationInput, SOAPNoteUpdateWithoutConsultationInput>, SOAPNoteUncheckedUpdateWithoutConsultationInput>
  }

  export type PrescriptionUpdateOneWithoutConsultationNestedInput = {
    create?: XOR<PrescriptionCreateWithoutConsultationInput, PrescriptionUncheckedCreateWithoutConsultationInput>
    connectOrCreate?: PrescriptionCreateOrConnectWithoutConsultationInput
    upsert?: PrescriptionUpsertWithoutConsultationInput
    disconnect?: PrescriptionWhereInput | boolean
    delete?: PrescriptionWhereInput | boolean
    connect?: PrescriptionWhereUniqueInput
    update?: XOR<XOR<PrescriptionUpdateToOneWithWhereWithoutConsultationInput, PrescriptionUpdateWithoutConsultationInput>, PrescriptionUncheckedUpdateWithoutConsultationInput>
  }

  export type ReferralUpdateOneWithoutConsultationNestedInput = {
    create?: XOR<ReferralCreateWithoutConsultationInput, ReferralUncheckedCreateWithoutConsultationInput>
    connectOrCreate?: ReferralCreateOrConnectWithoutConsultationInput
    upsert?: ReferralUpsertWithoutConsultationInput
    disconnect?: ReferralWhereInput | boolean
    delete?: ReferralWhereInput | boolean
    connect?: ReferralWhereUniqueInput
    update?: XOR<XOR<ReferralUpdateToOneWithWhereWithoutConsultationInput, ReferralUpdateWithoutConsultationInput>, ReferralUncheckedUpdateWithoutConsultationInput>
  }

  export type AppointmentUpdateOneWithoutConsultationNestedInput = {
    create?: XOR<AppointmentCreateWithoutConsultationInput, AppointmentUncheckedCreateWithoutConsultationInput>
    connectOrCreate?: AppointmentCreateOrConnectWithoutConsultationInput
    upsert?: AppointmentUpsertWithoutConsultationInput
    disconnect?: AppointmentWhereInput | boolean
    delete?: AppointmentWhereInput | boolean
    connect?: AppointmentWhereUniqueInput
    update?: XOR<XOR<AppointmentUpdateToOneWithWhereWithoutConsultationInput, AppointmentUpdateWithoutConsultationInput>, AppointmentUncheckedUpdateWithoutConsultationInput>
  }

  export type TranscriptUncheckedUpdateManyWithoutConsultationNestedInput = {
    create?: XOR<TranscriptCreateWithoutConsultationInput, TranscriptUncheckedCreateWithoutConsultationInput> | TranscriptCreateWithoutConsultationInput[] | TranscriptUncheckedCreateWithoutConsultationInput[]
    connectOrCreate?: TranscriptCreateOrConnectWithoutConsultationInput | TranscriptCreateOrConnectWithoutConsultationInput[]
    upsert?: TranscriptUpsertWithWhereUniqueWithoutConsultationInput | TranscriptUpsertWithWhereUniqueWithoutConsultationInput[]
    createMany?: TranscriptCreateManyConsultationInputEnvelope
    set?: TranscriptWhereUniqueInput | TranscriptWhereUniqueInput[]
    disconnect?: TranscriptWhereUniqueInput | TranscriptWhereUniqueInput[]
    delete?: TranscriptWhereUniqueInput | TranscriptWhereUniqueInput[]
    connect?: TranscriptWhereUniqueInput | TranscriptWhereUniqueInput[]
    update?: TranscriptUpdateWithWhereUniqueWithoutConsultationInput | TranscriptUpdateWithWhereUniqueWithoutConsultationInput[]
    updateMany?: TranscriptUpdateManyWithWhereWithoutConsultationInput | TranscriptUpdateManyWithWhereWithoutConsultationInput[]
    deleteMany?: TranscriptScalarWhereInput | TranscriptScalarWhereInput[]
  }

  export type SOAPNoteUncheckedUpdateOneWithoutConsultationNestedInput = {
    create?: XOR<SOAPNoteCreateWithoutConsultationInput, SOAPNoteUncheckedCreateWithoutConsultationInput>
    connectOrCreate?: SOAPNoteCreateOrConnectWithoutConsultationInput
    upsert?: SOAPNoteUpsertWithoutConsultationInput
    disconnect?: SOAPNoteWhereInput | boolean
    delete?: SOAPNoteWhereInput | boolean
    connect?: SOAPNoteWhereUniqueInput
    update?: XOR<XOR<SOAPNoteUpdateToOneWithWhereWithoutConsultationInput, SOAPNoteUpdateWithoutConsultationInput>, SOAPNoteUncheckedUpdateWithoutConsultationInput>
  }

  export type PrescriptionUncheckedUpdateOneWithoutConsultationNestedInput = {
    create?: XOR<PrescriptionCreateWithoutConsultationInput, PrescriptionUncheckedCreateWithoutConsultationInput>
    connectOrCreate?: PrescriptionCreateOrConnectWithoutConsultationInput
    upsert?: PrescriptionUpsertWithoutConsultationInput
    disconnect?: PrescriptionWhereInput | boolean
    delete?: PrescriptionWhereInput | boolean
    connect?: PrescriptionWhereUniqueInput
    update?: XOR<XOR<PrescriptionUpdateToOneWithWhereWithoutConsultationInput, PrescriptionUpdateWithoutConsultationInput>, PrescriptionUncheckedUpdateWithoutConsultationInput>
  }

  export type ReferralUncheckedUpdateOneWithoutConsultationNestedInput = {
    create?: XOR<ReferralCreateWithoutConsultationInput, ReferralUncheckedCreateWithoutConsultationInput>
    connectOrCreate?: ReferralCreateOrConnectWithoutConsultationInput
    upsert?: ReferralUpsertWithoutConsultationInput
    disconnect?: ReferralWhereInput | boolean
    delete?: ReferralWhereInput | boolean
    connect?: ReferralWhereUniqueInput
    update?: XOR<XOR<ReferralUpdateToOneWithWhereWithoutConsultationInput, ReferralUpdateWithoutConsultationInput>, ReferralUncheckedUpdateWithoutConsultationInput>
  }

  export type AppointmentUncheckedUpdateOneWithoutConsultationNestedInput = {
    create?: XOR<AppointmentCreateWithoutConsultationInput, AppointmentUncheckedCreateWithoutConsultationInput>
    connectOrCreate?: AppointmentCreateOrConnectWithoutConsultationInput
    upsert?: AppointmentUpsertWithoutConsultationInput
    disconnect?: AppointmentWhereInput | boolean
    delete?: AppointmentWhereInput | boolean
    connect?: AppointmentWhereUniqueInput
    update?: XOR<XOR<AppointmentUpdateToOneWithWhereWithoutConsultationInput, AppointmentUpdateWithoutConsultationInput>, AppointmentUncheckedUpdateWithoutConsultationInput>
  }

  export type ConsultationCreateNestedOneWithoutTranscriptsInput = {
    create?: XOR<ConsultationCreateWithoutTranscriptsInput, ConsultationUncheckedCreateWithoutTranscriptsInput>
    connectOrCreate?: ConsultationCreateOrConnectWithoutTranscriptsInput
    connect?: ConsultationWhereUniqueInput
  }

  export type EnumSpeakerFieldUpdateOperationsInput = {
    set?: $Enums.Speaker
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ConsultationUpdateOneRequiredWithoutTranscriptsNestedInput = {
    create?: XOR<ConsultationCreateWithoutTranscriptsInput, ConsultationUncheckedCreateWithoutTranscriptsInput>
    connectOrCreate?: ConsultationCreateOrConnectWithoutTranscriptsInput
    upsert?: ConsultationUpsertWithoutTranscriptsInput
    connect?: ConsultationWhereUniqueInput
    update?: XOR<XOR<ConsultationUpdateToOneWithWhereWithoutTranscriptsInput, ConsultationUpdateWithoutTranscriptsInput>, ConsultationUncheckedUpdateWithoutTranscriptsInput>
  }

  export type ConsultationCreateNestedOneWithoutSoapNoteInput = {
    create?: XOR<ConsultationCreateWithoutSoapNoteInput, ConsultationUncheckedCreateWithoutSoapNoteInput>
    connectOrCreate?: ConsultationCreateOrConnectWithoutSoapNoteInput
    connect?: ConsultationWhereUniqueInput
  }

  export type ConsultationUpdateOneRequiredWithoutSoapNoteNestedInput = {
    create?: XOR<ConsultationCreateWithoutSoapNoteInput, ConsultationUncheckedCreateWithoutSoapNoteInput>
    connectOrCreate?: ConsultationCreateOrConnectWithoutSoapNoteInput
    upsert?: ConsultationUpsertWithoutSoapNoteInput
    connect?: ConsultationWhereUniqueInput
    update?: XOR<XOR<ConsultationUpdateToOneWithWhereWithoutSoapNoteInput, ConsultationUpdateWithoutSoapNoteInput>, ConsultationUncheckedUpdateWithoutSoapNoteInput>
  }

  export type ConsultationCreateNestedOneWithoutPrescriptionInput = {
    create?: XOR<ConsultationCreateWithoutPrescriptionInput, ConsultationUncheckedCreateWithoutPrescriptionInput>
    connectOrCreate?: ConsultationCreateOrConnectWithoutPrescriptionInput
    connect?: ConsultationWhereUniqueInput
  }

  export type PatientCreateNestedOneWithoutPrescriptionsInput = {
    create?: XOR<PatientCreateWithoutPrescriptionsInput, PatientUncheckedCreateWithoutPrescriptionsInput>
    connectOrCreate?: PatientCreateOrConnectWithoutPrescriptionsInput
    connect?: PatientWhereUniqueInput
  }

  export type ConsultationUpdateOneRequiredWithoutPrescriptionNestedInput = {
    create?: XOR<ConsultationCreateWithoutPrescriptionInput, ConsultationUncheckedCreateWithoutPrescriptionInput>
    connectOrCreate?: ConsultationCreateOrConnectWithoutPrescriptionInput
    upsert?: ConsultationUpsertWithoutPrescriptionInput
    connect?: ConsultationWhereUniqueInput
    update?: XOR<XOR<ConsultationUpdateToOneWithWhereWithoutPrescriptionInput, ConsultationUpdateWithoutPrescriptionInput>, ConsultationUncheckedUpdateWithoutPrescriptionInput>
  }

  export type PatientUpdateOneRequiredWithoutPrescriptionsNestedInput = {
    create?: XOR<PatientCreateWithoutPrescriptionsInput, PatientUncheckedCreateWithoutPrescriptionsInput>
    connectOrCreate?: PatientCreateOrConnectWithoutPrescriptionsInput
    upsert?: PatientUpsertWithoutPrescriptionsInput
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutPrescriptionsInput, PatientUpdateWithoutPrescriptionsInput>, PatientUncheckedUpdateWithoutPrescriptionsInput>
  }

  export type ConsultationCreateNestedOneWithoutReferralInput = {
    create?: XOR<ConsultationCreateWithoutReferralInput, ConsultationUncheckedCreateWithoutReferralInput>
    connectOrCreate?: ConsultationCreateOrConnectWithoutReferralInput
    connect?: ConsultationWhereUniqueInput
  }

  export type PatientCreateNestedOneWithoutReferralsInput = {
    create?: XOR<PatientCreateWithoutReferralsInput, PatientUncheckedCreateWithoutReferralsInput>
    connectOrCreate?: PatientCreateOrConnectWithoutReferralsInput
    connect?: PatientWhereUniqueInput
  }

  export type EnumUrgencyFieldUpdateOperationsInput = {
    set?: $Enums.Urgency
  }

  export type ConsultationUpdateOneRequiredWithoutReferralNestedInput = {
    create?: XOR<ConsultationCreateWithoutReferralInput, ConsultationUncheckedCreateWithoutReferralInput>
    connectOrCreate?: ConsultationCreateOrConnectWithoutReferralInput
    upsert?: ConsultationUpsertWithoutReferralInput
    connect?: ConsultationWhereUniqueInput
    update?: XOR<XOR<ConsultationUpdateToOneWithWhereWithoutReferralInput, ConsultationUpdateWithoutReferralInput>, ConsultationUncheckedUpdateWithoutReferralInput>
  }

  export type PatientUpdateOneRequiredWithoutReferralsNestedInput = {
    create?: XOR<PatientCreateWithoutReferralsInput, PatientUncheckedCreateWithoutReferralsInput>
    connectOrCreate?: PatientCreateOrConnectWithoutReferralsInput
    upsert?: PatientUpsertWithoutReferralsInput
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutReferralsInput, PatientUpdateWithoutReferralsInput>, PatientUncheckedUpdateWithoutReferralsInput>
  }

  export type ConsultationCreateNestedOneWithoutAppointmentInput = {
    create?: XOR<ConsultationCreateWithoutAppointmentInput, ConsultationUncheckedCreateWithoutAppointmentInput>
    connectOrCreate?: ConsultationCreateOrConnectWithoutAppointmentInput
    connect?: ConsultationWhereUniqueInput
  }

  export type PatientCreateNestedOneWithoutAppointmentsInput = {
    create?: XOR<PatientCreateWithoutAppointmentsInput, PatientUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: PatientCreateOrConnectWithoutAppointmentsInput
    connect?: PatientWhereUniqueInput
  }

  export type EnumAppointmentTypeFieldUpdateOperationsInput = {
    set?: $Enums.AppointmentType
  }

  export type ConsultationUpdateOneRequiredWithoutAppointmentNestedInput = {
    create?: XOR<ConsultationCreateWithoutAppointmentInput, ConsultationUncheckedCreateWithoutAppointmentInput>
    connectOrCreate?: ConsultationCreateOrConnectWithoutAppointmentInput
    upsert?: ConsultationUpsertWithoutAppointmentInput
    connect?: ConsultationWhereUniqueInput
    update?: XOR<XOR<ConsultationUpdateToOneWithWhereWithoutAppointmentInput, ConsultationUpdateWithoutAppointmentInput>, ConsultationUncheckedUpdateWithoutAppointmentInput>
  }

  export type PatientUpdateOneRequiredWithoutAppointmentsNestedInput = {
    create?: XOR<PatientCreateWithoutAppointmentsInput, PatientUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: PatientCreateOrConnectWithoutAppointmentsInput
    upsert?: PatientUpsertWithoutAppointmentsInput
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutAppointmentsInput, PatientUpdateWithoutAppointmentsInput>, PatientUncheckedUpdateWithoutAppointmentsInput>
  }

  export type UserCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAuditLogsNestedInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    upsert?: UserUpsertWithoutAuditLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuditLogsInput, UserUpdateWithoutAuditLogsInput>, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumGenderFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderFilter<$PrismaModel> | $Enums.Gender
  }

  export type NestedEnumGenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderWithAggregatesFilter<$PrismaModel> | $Enums.Gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenderFilter<$PrismaModel>
    _max?: NestedEnumGenderFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumConsultationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ConsultationStatus | EnumConsultationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConsultationStatus[] | ListEnumConsultationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConsultationStatus[] | ListEnumConsultationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumConsultationStatusFilter<$PrismaModel> | $Enums.ConsultationStatus
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumConsultationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConsultationStatus | EnumConsultationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConsultationStatus[] | ListEnumConsultationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConsultationStatus[] | ListEnumConsultationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumConsultationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ConsultationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConsultationStatusFilter<$PrismaModel>
    _max?: NestedEnumConsultationStatusFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumSpeakerFilter<$PrismaModel = never> = {
    equals?: $Enums.Speaker | EnumSpeakerFieldRefInput<$PrismaModel>
    in?: $Enums.Speaker[] | ListEnumSpeakerFieldRefInput<$PrismaModel>
    notIn?: $Enums.Speaker[] | ListEnumSpeakerFieldRefInput<$PrismaModel>
    not?: NestedEnumSpeakerFilter<$PrismaModel> | $Enums.Speaker
  }

  export type NestedEnumSpeakerWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Speaker | EnumSpeakerFieldRefInput<$PrismaModel>
    in?: $Enums.Speaker[] | ListEnumSpeakerFieldRefInput<$PrismaModel>
    notIn?: $Enums.Speaker[] | ListEnumSpeakerFieldRefInput<$PrismaModel>
    not?: NestedEnumSpeakerWithAggregatesFilter<$PrismaModel> | $Enums.Speaker
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSpeakerFilter<$PrismaModel>
    _max?: NestedEnumSpeakerFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumUrgencyFilter<$PrismaModel = never> = {
    equals?: $Enums.Urgency | EnumUrgencyFieldRefInput<$PrismaModel>
    in?: $Enums.Urgency[] | ListEnumUrgencyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Urgency[] | ListEnumUrgencyFieldRefInput<$PrismaModel>
    not?: NestedEnumUrgencyFilter<$PrismaModel> | $Enums.Urgency
  }

  export type NestedEnumUrgencyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Urgency | EnumUrgencyFieldRefInput<$PrismaModel>
    in?: $Enums.Urgency[] | ListEnumUrgencyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Urgency[] | ListEnumUrgencyFieldRefInput<$PrismaModel>
    not?: NestedEnumUrgencyWithAggregatesFilter<$PrismaModel> | $Enums.Urgency
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUrgencyFilter<$PrismaModel>
    _max?: NestedEnumUrgencyFilter<$PrismaModel>
  }

  export type NestedEnumAppointmentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentType | EnumAppointmentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentType[] | ListEnumAppointmentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentType[] | ListEnumAppointmentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentTypeFilter<$PrismaModel> | $Enums.AppointmentType
  }

  export type NestedEnumAppointmentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentType | EnumAppointmentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentType[] | ListEnumAppointmentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentType[] | ListEnumAppointmentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentTypeWithAggregatesFilter<$PrismaModel> | $Enums.AppointmentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAppointmentTypeFilter<$PrismaModel>
    _max?: NestedEnumAppointmentTypeFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ConsultationCreateWithoutDoctorInput = {
    id?: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    status?: $Enums.ConsultationStatus
    audioUrl?: string | null
    duration?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: PatientCreateNestedOneWithoutConsultationsInput
    transcripts?: TranscriptCreateNestedManyWithoutConsultationInput
    soapNote?: SOAPNoteCreateNestedOneWithoutConsultationInput
    prescription?: PrescriptionCreateNestedOneWithoutConsultationInput
    referral?: ReferralCreateNestedOneWithoutConsultationInput
    appointment?: AppointmentCreateNestedOneWithoutConsultationInput
  }

  export type ConsultationUncheckedCreateWithoutDoctorInput = {
    id?: string
    patientId: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    status?: $Enums.ConsultationStatus
    audioUrl?: string | null
    duration?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transcripts?: TranscriptUncheckedCreateNestedManyWithoutConsultationInput
    soapNote?: SOAPNoteUncheckedCreateNestedOneWithoutConsultationInput
    prescription?: PrescriptionUncheckedCreateNestedOneWithoutConsultationInput
    referral?: ReferralUncheckedCreateNestedOneWithoutConsultationInput
    appointment?: AppointmentUncheckedCreateNestedOneWithoutConsultationInput
  }

  export type ConsultationCreateOrConnectWithoutDoctorInput = {
    where: ConsultationWhereUniqueInput
    create: XOR<ConsultationCreateWithoutDoctorInput, ConsultationUncheckedCreateWithoutDoctorInput>
  }

  export type ConsultationCreateManyDoctorInputEnvelope = {
    data: ConsultationCreateManyDoctorInput | ConsultationCreateManyDoctorInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutUserInput = {
    id?: string
    action: string
    resourceType: string
    resourceId: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    timestamp?: Date | string
  }

  export type AuditLogUncheckedCreateWithoutUserInput = {
    id?: string
    action: string
    resourceType: string
    resourceId: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    timestamp?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogCreateManyUserInputEnvelope = {
    data: AuditLogCreateManyUserInput | AuditLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ConsultationUpsertWithWhereUniqueWithoutDoctorInput = {
    where: ConsultationWhereUniqueInput
    update: XOR<ConsultationUpdateWithoutDoctorInput, ConsultationUncheckedUpdateWithoutDoctorInput>
    create: XOR<ConsultationCreateWithoutDoctorInput, ConsultationUncheckedCreateWithoutDoctorInput>
  }

  export type ConsultationUpdateWithWhereUniqueWithoutDoctorInput = {
    where: ConsultationWhereUniqueInput
    data: XOR<ConsultationUpdateWithoutDoctorInput, ConsultationUncheckedUpdateWithoutDoctorInput>
  }

  export type ConsultationUpdateManyWithWhereWithoutDoctorInput = {
    where: ConsultationScalarWhereInput
    data: XOR<ConsultationUpdateManyMutationInput, ConsultationUncheckedUpdateManyWithoutDoctorInput>
  }

  export type ConsultationScalarWhereInput = {
    AND?: ConsultationScalarWhereInput | ConsultationScalarWhereInput[]
    OR?: ConsultationScalarWhereInput[]
    NOT?: ConsultationScalarWhereInput | ConsultationScalarWhereInput[]
    id?: StringFilter<"Consultation"> | string
    patientId?: StringFilter<"Consultation"> | string
    doctorId?: StringFilter<"Consultation"> | string
    startedAt?: DateTimeFilter<"Consultation"> | Date | string
    endedAt?: DateTimeNullableFilter<"Consultation"> | Date | string | null
    status?: EnumConsultationStatusFilter<"Consultation"> | $Enums.ConsultationStatus
    audioUrl?: StringNullableFilter<"Consultation"> | string | null
    duration?: IntNullableFilter<"Consultation"> | number | null
    createdAt?: DateTimeFilter<"Consultation"> | Date | string
    updatedAt?: DateTimeFilter<"Consultation"> | Date | string
  }

  export type AuditLogUpsertWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutUserInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutUserInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    OR?: AuditLogScalarWhereInput[]
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    userId?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    resourceType?: StringFilter<"AuditLog"> | string
    resourceId?: StringFilter<"AuditLog"> | string
    metadata?: JsonNullableFilter<"AuditLog">
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type ConsultationCreateWithoutPatientInput = {
    id?: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    status?: $Enums.ConsultationStatus
    audioUrl?: string | null
    duration?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    doctor: UserCreateNestedOneWithoutConsultationsInput
    transcripts?: TranscriptCreateNestedManyWithoutConsultationInput
    soapNote?: SOAPNoteCreateNestedOneWithoutConsultationInput
    prescription?: PrescriptionCreateNestedOneWithoutConsultationInput
    referral?: ReferralCreateNestedOneWithoutConsultationInput
    appointment?: AppointmentCreateNestedOneWithoutConsultationInput
  }

  export type ConsultationUncheckedCreateWithoutPatientInput = {
    id?: string
    doctorId: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    status?: $Enums.ConsultationStatus
    audioUrl?: string | null
    duration?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transcripts?: TranscriptUncheckedCreateNestedManyWithoutConsultationInput
    soapNote?: SOAPNoteUncheckedCreateNestedOneWithoutConsultationInput
    prescription?: PrescriptionUncheckedCreateNestedOneWithoutConsultationInput
    referral?: ReferralUncheckedCreateNestedOneWithoutConsultationInput
    appointment?: AppointmentUncheckedCreateNestedOneWithoutConsultationInput
  }

  export type ConsultationCreateOrConnectWithoutPatientInput = {
    where: ConsultationWhereUniqueInput
    create: XOR<ConsultationCreateWithoutPatientInput, ConsultationUncheckedCreateWithoutPatientInput>
  }

  export type ConsultationCreateManyPatientInputEnvelope = {
    data: ConsultationCreateManyPatientInput | ConsultationCreateManyPatientInput[]
    skipDuplicates?: boolean
  }

  export type PrescriptionCreateWithoutPatientInput = {
    id?: string
    medications: JsonNullValueInput | InputJsonValue
    instructions?: string | null
    isApproved?: boolean
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    consultation: ConsultationCreateNestedOneWithoutPrescriptionInput
  }

  export type PrescriptionUncheckedCreateWithoutPatientInput = {
    id?: string
    consultationId: string
    medications: JsonNullValueInput | InputJsonValue
    instructions?: string | null
    isApproved?: boolean
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PrescriptionCreateOrConnectWithoutPatientInput = {
    where: PrescriptionWhereUniqueInput
    create: XOR<PrescriptionCreateWithoutPatientInput, PrescriptionUncheckedCreateWithoutPatientInput>
  }

  export type PrescriptionCreateManyPatientInputEnvelope = {
    data: PrescriptionCreateManyPatientInput | PrescriptionCreateManyPatientInput[]
    skipDuplicates?: boolean
  }

  export type ReferralCreateWithoutPatientInput = {
    id?: string
    specialty: string
    reason: string
    urgency?: $Enums.Urgency
    notes?: string | null
    isApproved?: boolean
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    consultation: ConsultationCreateNestedOneWithoutReferralInput
  }

  export type ReferralUncheckedCreateWithoutPatientInput = {
    id?: string
    consultationId: string
    specialty: string
    reason: string
    urgency?: $Enums.Urgency
    notes?: string | null
    isApproved?: boolean
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReferralCreateOrConnectWithoutPatientInput = {
    where: ReferralWhereUniqueInput
    create: XOR<ReferralCreateWithoutPatientInput, ReferralUncheckedCreateWithoutPatientInput>
  }

  export type ReferralCreateManyPatientInputEnvelope = {
    data: ReferralCreateManyPatientInput | ReferralCreateManyPatientInput[]
    skipDuplicates?: boolean
  }

  export type AppointmentCreateWithoutPatientInput = {
    id?: string
    scheduledAt: Date | string
    type: $Enums.AppointmentType
    reason?: string | null
    isApproved?: boolean
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    consultation: ConsultationCreateNestedOneWithoutAppointmentInput
  }

  export type AppointmentUncheckedCreateWithoutPatientInput = {
    id?: string
    consultationId: string
    scheduledAt: Date | string
    type: $Enums.AppointmentType
    reason?: string | null
    isApproved?: boolean
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentCreateOrConnectWithoutPatientInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput>
  }

  export type AppointmentCreateManyPatientInputEnvelope = {
    data: AppointmentCreateManyPatientInput | AppointmentCreateManyPatientInput[]
    skipDuplicates?: boolean
  }

  export type ConsultationUpsertWithWhereUniqueWithoutPatientInput = {
    where: ConsultationWhereUniqueInput
    update: XOR<ConsultationUpdateWithoutPatientInput, ConsultationUncheckedUpdateWithoutPatientInput>
    create: XOR<ConsultationCreateWithoutPatientInput, ConsultationUncheckedCreateWithoutPatientInput>
  }

  export type ConsultationUpdateWithWhereUniqueWithoutPatientInput = {
    where: ConsultationWhereUniqueInput
    data: XOR<ConsultationUpdateWithoutPatientInput, ConsultationUncheckedUpdateWithoutPatientInput>
  }

  export type ConsultationUpdateManyWithWhereWithoutPatientInput = {
    where: ConsultationScalarWhereInput
    data: XOR<ConsultationUpdateManyMutationInput, ConsultationUncheckedUpdateManyWithoutPatientInput>
  }

  export type PrescriptionUpsertWithWhereUniqueWithoutPatientInput = {
    where: PrescriptionWhereUniqueInput
    update: XOR<PrescriptionUpdateWithoutPatientInput, PrescriptionUncheckedUpdateWithoutPatientInput>
    create: XOR<PrescriptionCreateWithoutPatientInput, PrescriptionUncheckedCreateWithoutPatientInput>
  }

  export type PrescriptionUpdateWithWhereUniqueWithoutPatientInput = {
    where: PrescriptionWhereUniqueInput
    data: XOR<PrescriptionUpdateWithoutPatientInput, PrescriptionUncheckedUpdateWithoutPatientInput>
  }

  export type PrescriptionUpdateManyWithWhereWithoutPatientInput = {
    where: PrescriptionScalarWhereInput
    data: XOR<PrescriptionUpdateManyMutationInput, PrescriptionUncheckedUpdateManyWithoutPatientInput>
  }

  export type PrescriptionScalarWhereInput = {
    AND?: PrescriptionScalarWhereInput | PrescriptionScalarWhereInput[]
    OR?: PrescriptionScalarWhereInput[]
    NOT?: PrescriptionScalarWhereInput | PrescriptionScalarWhereInput[]
    id?: StringFilter<"Prescription"> | string
    consultationId?: StringFilter<"Prescription"> | string
    patientId?: StringFilter<"Prescription"> | string
    medications?: JsonFilter<"Prescription">
    instructions?: StringNullableFilter<"Prescription"> | string | null
    isApproved?: BoolFilter<"Prescription"> | boolean
    approvedAt?: DateTimeNullableFilter<"Prescription"> | Date | string | null
    createdAt?: DateTimeFilter<"Prescription"> | Date | string
    updatedAt?: DateTimeFilter<"Prescription"> | Date | string
  }

  export type ReferralUpsertWithWhereUniqueWithoutPatientInput = {
    where: ReferralWhereUniqueInput
    update: XOR<ReferralUpdateWithoutPatientInput, ReferralUncheckedUpdateWithoutPatientInput>
    create: XOR<ReferralCreateWithoutPatientInput, ReferralUncheckedCreateWithoutPatientInput>
  }

  export type ReferralUpdateWithWhereUniqueWithoutPatientInput = {
    where: ReferralWhereUniqueInput
    data: XOR<ReferralUpdateWithoutPatientInput, ReferralUncheckedUpdateWithoutPatientInput>
  }

  export type ReferralUpdateManyWithWhereWithoutPatientInput = {
    where: ReferralScalarWhereInput
    data: XOR<ReferralUpdateManyMutationInput, ReferralUncheckedUpdateManyWithoutPatientInput>
  }

  export type ReferralScalarWhereInput = {
    AND?: ReferralScalarWhereInput | ReferralScalarWhereInput[]
    OR?: ReferralScalarWhereInput[]
    NOT?: ReferralScalarWhereInput | ReferralScalarWhereInput[]
    id?: StringFilter<"Referral"> | string
    consultationId?: StringFilter<"Referral"> | string
    patientId?: StringFilter<"Referral"> | string
    specialty?: StringFilter<"Referral"> | string
    reason?: StringFilter<"Referral"> | string
    urgency?: EnumUrgencyFilter<"Referral"> | $Enums.Urgency
    notes?: StringNullableFilter<"Referral"> | string | null
    isApproved?: BoolFilter<"Referral"> | boolean
    approvedAt?: DateTimeNullableFilter<"Referral"> | Date | string | null
    createdAt?: DateTimeFilter<"Referral"> | Date | string
    updatedAt?: DateTimeFilter<"Referral"> | Date | string
  }

  export type AppointmentUpsertWithWhereUniqueWithoutPatientInput = {
    where: AppointmentWhereUniqueInput
    update: XOR<AppointmentUpdateWithoutPatientInput, AppointmentUncheckedUpdateWithoutPatientInput>
    create: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput>
  }

  export type AppointmentUpdateWithWhereUniqueWithoutPatientInput = {
    where: AppointmentWhereUniqueInput
    data: XOR<AppointmentUpdateWithoutPatientInput, AppointmentUncheckedUpdateWithoutPatientInput>
  }

  export type AppointmentUpdateManyWithWhereWithoutPatientInput = {
    where: AppointmentScalarWhereInput
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyWithoutPatientInput>
  }

  export type AppointmentScalarWhereInput = {
    AND?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
    OR?: AppointmentScalarWhereInput[]
    NOT?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
    id?: StringFilter<"Appointment"> | string
    consultationId?: StringFilter<"Appointment"> | string
    patientId?: StringFilter<"Appointment"> | string
    scheduledAt?: DateTimeFilter<"Appointment"> | Date | string
    type?: EnumAppointmentTypeFilter<"Appointment"> | $Enums.AppointmentType
    reason?: StringNullableFilter<"Appointment"> | string | null
    isApproved?: BoolFilter<"Appointment"> | boolean
    approvedAt?: DateTimeNullableFilter<"Appointment"> | Date | string | null
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
  }

  export type PatientCreateWithoutConsultationsInput = {
    id?: string
    mrn: string
    firstName: string
    lastName: string
    dob: Date | string
    gender: $Enums.Gender
    phone?: string | null
    email?: string | null
    address?: string | null
    allergies?: PatientCreateallergiesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    prescriptions?: PrescriptionCreateNestedManyWithoutPatientInput
    referrals?: ReferralCreateNestedManyWithoutPatientInput
    appointments?: AppointmentCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutConsultationsInput = {
    id?: string
    mrn: string
    firstName: string
    lastName: string
    dob: Date | string
    gender: $Enums.Gender
    phone?: string | null
    email?: string | null
    address?: string | null
    allergies?: PatientCreateallergiesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    prescriptions?: PrescriptionUncheckedCreateNestedManyWithoutPatientInput
    referrals?: ReferralUncheckedCreateNestedManyWithoutPatientInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutConsultationsInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutConsultationsInput, PatientUncheckedCreateWithoutConsultationsInput>
  }

  export type UserCreateWithoutConsultationsInput = {
    id?: string
    email: string
    name: string
    passwordHash: string
    role?: $Enums.UserRole
    specialty?: string | null
    licenseNumber?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutConsultationsInput = {
    id?: string
    email: string
    name: string
    passwordHash: string
    role?: $Enums.UserRole
    specialty?: string | null
    licenseNumber?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutConsultationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutConsultationsInput, UserUncheckedCreateWithoutConsultationsInput>
  }

  export type TranscriptCreateWithoutConsultationInput = {
    id?: string
    text: string
    speaker: $Enums.Speaker
    timestamp?: Date | string
    confidence?: number | null
  }

  export type TranscriptUncheckedCreateWithoutConsultationInput = {
    id?: string
    text: string
    speaker: $Enums.Speaker
    timestamp?: Date | string
    confidence?: number | null
  }

  export type TranscriptCreateOrConnectWithoutConsultationInput = {
    where: TranscriptWhereUniqueInput
    create: XOR<TranscriptCreateWithoutConsultationInput, TranscriptUncheckedCreateWithoutConsultationInput>
  }

  export type TranscriptCreateManyConsultationInputEnvelope = {
    data: TranscriptCreateManyConsultationInput | TranscriptCreateManyConsultationInput[]
    skipDuplicates?: boolean
  }

  export type SOAPNoteCreateWithoutConsultationInput = {
    id?: string
    subjective: string
    objective: string
    assessment: string
    plan: string
    isApproved?: boolean
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SOAPNoteUncheckedCreateWithoutConsultationInput = {
    id?: string
    subjective: string
    objective: string
    assessment: string
    plan: string
    isApproved?: boolean
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SOAPNoteCreateOrConnectWithoutConsultationInput = {
    where: SOAPNoteWhereUniqueInput
    create: XOR<SOAPNoteCreateWithoutConsultationInput, SOAPNoteUncheckedCreateWithoutConsultationInput>
  }

  export type PrescriptionCreateWithoutConsultationInput = {
    id?: string
    medications: JsonNullValueInput | InputJsonValue
    instructions?: string | null
    isApproved?: boolean
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: PatientCreateNestedOneWithoutPrescriptionsInput
  }

  export type PrescriptionUncheckedCreateWithoutConsultationInput = {
    id?: string
    patientId: string
    medications: JsonNullValueInput | InputJsonValue
    instructions?: string | null
    isApproved?: boolean
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PrescriptionCreateOrConnectWithoutConsultationInput = {
    where: PrescriptionWhereUniqueInput
    create: XOR<PrescriptionCreateWithoutConsultationInput, PrescriptionUncheckedCreateWithoutConsultationInput>
  }

  export type ReferralCreateWithoutConsultationInput = {
    id?: string
    specialty: string
    reason: string
    urgency?: $Enums.Urgency
    notes?: string | null
    isApproved?: boolean
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: PatientCreateNestedOneWithoutReferralsInput
  }

  export type ReferralUncheckedCreateWithoutConsultationInput = {
    id?: string
    patientId: string
    specialty: string
    reason: string
    urgency?: $Enums.Urgency
    notes?: string | null
    isApproved?: boolean
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReferralCreateOrConnectWithoutConsultationInput = {
    where: ReferralWhereUniqueInput
    create: XOR<ReferralCreateWithoutConsultationInput, ReferralUncheckedCreateWithoutConsultationInput>
  }

  export type AppointmentCreateWithoutConsultationInput = {
    id?: string
    scheduledAt: Date | string
    type: $Enums.AppointmentType
    reason?: string | null
    isApproved?: boolean
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: PatientCreateNestedOneWithoutAppointmentsInput
  }

  export type AppointmentUncheckedCreateWithoutConsultationInput = {
    id?: string
    patientId: string
    scheduledAt: Date | string
    type: $Enums.AppointmentType
    reason?: string | null
    isApproved?: boolean
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentCreateOrConnectWithoutConsultationInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutConsultationInput, AppointmentUncheckedCreateWithoutConsultationInput>
  }

  export type PatientUpsertWithoutConsultationsInput = {
    update: XOR<PatientUpdateWithoutConsultationsInput, PatientUncheckedUpdateWithoutConsultationsInput>
    create: XOR<PatientCreateWithoutConsultationsInput, PatientUncheckedCreateWithoutConsultationsInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutConsultationsInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutConsultationsInput, PatientUncheckedUpdateWithoutConsultationsInput>
  }

  export type PatientUpdateWithoutConsultationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    mrn?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    dob?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: PatientUpdateallergiesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prescriptions?: PrescriptionUpdateManyWithoutPatientNestedInput
    referrals?: ReferralUpdateManyWithoutPatientNestedInput
    appointments?: AppointmentUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutConsultationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    mrn?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    dob?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: PatientUpdateallergiesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prescriptions?: PrescriptionUncheckedUpdateManyWithoutPatientNestedInput
    referrals?: ReferralUncheckedUpdateManyWithoutPatientNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type UserUpsertWithoutConsultationsInput = {
    update: XOR<UserUpdateWithoutConsultationsInput, UserUncheckedUpdateWithoutConsultationsInput>
    create: XOR<UserCreateWithoutConsultationsInput, UserUncheckedCreateWithoutConsultationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutConsultationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutConsultationsInput, UserUncheckedUpdateWithoutConsultationsInput>
  }

  export type UserUpdateWithoutConsultationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    specialty?: NullableStringFieldUpdateOperationsInput | string | null
    licenseNumber?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutConsultationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    specialty?: NullableStringFieldUpdateOperationsInput | string | null
    licenseNumber?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TranscriptUpsertWithWhereUniqueWithoutConsultationInput = {
    where: TranscriptWhereUniqueInput
    update: XOR<TranscriptUpdateWithoutConsultationInput, TranscriptUncheckedUpdateWithoutConsultationInput>
    create: XOR<TranscriptCreateWithoutConsultationInput, TranscriptUncheckedCreateWithoutConsultationInput>
  }

  export type TranscriptUpdateWithWhereUniqueWithoutConsultationInput = {
    where: TranscriptWhereUniqueInput
    data: XOR<TranscriptUpdateWithoutConsultationInput, TranscriptUncheckedUpdateWithoutConsultationInput>
  }

  export type TranscriptUpdateManyWithWhereWithoutConsultationInput = {
    where: TranscriptScalarWhereInput
    data: XOR<TranscriptUpdateManyMutationInput, TranscriptUncheckedUpdateManyWithoutConsultationInput>
  }

  export type TranscriptScalarWhereInput = {
    AND?: TranscriptScalarWhereInput | TranscriptScalarWhereInput[]
    OR?: TranscriptScalarWhereInput[]
    NOT?: TranscriptScalarWhereInput | TranscriptScalarWhereInput[]
    id?: StringFilter<"Transcript"> | string
    consultationId?: StringFilter<"Transcript"> | string
    text?: StringFilter<"Transcript"> | string
    speaker?: EnumSpeakerFilter<"Transcript"> | $Enums.Speaker
    timestamp?: DateTimeFilter<"Transcript"> | Date | string
    confidence?: FloatNullableFilter<"Transcript"> | number | null
  }

  export type SOAPNoteUpsertWithoutConsultationInput = {
    update: XOR<SOAPNoteUpdateWithoutConsultationInput, SOAPNoteUncheckedUpdateWithoutConsultationInput>
    create: XOR<SOAPNoteCreateWithoutConsultationInput, SOAPNoteUncheckedCreateWithoutConsultationInput>
    where?: SOAPNoteWhereInput
  }

  export type SOAPNoteUpdateToOneWithWhereWithoutConsultationInput = {
    where?: SOAPNoteWhereInput
    data: XOR<SOAPNoteUpdateWithoutConsultationInput, SOAPNoteUncheckedUpdateWithoutConsultationInput>
  }

  export type SOAPNoteUpdateWithoutConsultationInput = {
    id?: StringFieldUpdateOperationsInput | string
    subjective?: StringFieldUpdateOperationsInput | string
    objective?: StringFieldUpdateOperationsInput | string
    assessment?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SOAPNoteUncheckedUpdateWithoutConsultationInput = {
    id?: StringFieldUpdateOperationsInput | string
    subjective?: StringFieldUpdateOperationsInput | string
    objective?: StringFieldUpdateOperationsInput | string
    assessment?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrescriptionUpsertWithoutConsultationInput = {
    update: XOR<PrescriptionUpdateWithoutConsultationInput, PrescriptionUncheckedUpdateWithoutConsultationInput>
    create: XOR<PrescriptionCreateWithoutConsultationInput, PrescriptionUncheckedCreateWithoutConsultationInput>
    where?: PrescriptionWhereInput
  }

  export type PrescriptionUpdateToOneWithWhereWithoutConsultationInput = {
    where?: PrescriptionWhereInput
    data: XOR<PrescriptionUpdateWithoutConsultationInput, PrescriptionUncheckedUpdateWithoutConsultationInput>
  }

  export type PrescriptionUpdateWithoutConsultationInput = {
    id?: StringFieldUpdateOperationsInput | string
    medications?: JsonNullValueInput | InputJsonValue
    instructions?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutPrescriptionsNestedInput
  }

  export type PrescriptionUncheckedUpdateWithoutConsultationInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    medications?: JsonNullValueInput | InputJsonValue
    instructions?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReferralUpsertWithoutConsultationInput = {
    update: XOR<ReferralUpdateWithoutConsultationInput, ReferralUncheckedUpdateWithoutConsultationInput>
    create: XOR<ReferralCreateWithoutConsultationInput, ReferralUncheckedCreateWithoutConsultationInput>
    where?: ReferralWhereInput
  }

  export type ReferralUpdateToOneWithWhereWithoutConsultationInput = {
    where?: ReferralWhereInput
    data: XOR<ReferralUpdateWithoutConsultationInput, ReferralUncheckedUpdateWithoutConsultationInput>
  }

  export type ReferralUpdateWithoutConsultationInput = {
    id?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    urgency?: EnumUrgencyFieldUpdateOperationsInput | $Enums.Urgency
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutReferralsNestedInput
  }

  export type ReferralUncheckedUpdateWithoutConsultationInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    urgency?: EnumUrgencyFieldUpdateOperationsInput | $Enums.Urgency
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUpsertWithoutConsultationInput = {
    update: XOR<AppointmentUpdateWithoutConsultationInput, AppointmentUncheckedUpdateWithoutConsultationInput>
    create: XOR<AppointmentCreateWithoutConsultationInput, AppointmentUncheckedCreateWithoutConsultationInput>
    where?: AppointmentWhereInput
  }

  export type AppointmentUpdateToOneWithWhereWithoutConsultationInput = {
    where?: AppointmentWhereInput
    data: XOR<AppointmentUpdateWithoutConsultationInput, AppointmentUncheckedUpdateWithoutConsultationInput>
  }

  export type AppointmentUpdateWithoutConsultationInput = {
    id?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumAppointmentTypeFieldUpdateOperationsInput | $Enums.AppointmentType
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutConsultationInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumAppointmentTypeFieldUpdateOperationsInput | $Enums.AppointmentType
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsultationCreateWithoutTranscriptsInput = {
    id?: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    status?: $Enums.ConsultationStatus
    audioUrl?: string | null
    duration?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: PatientCreateNestedOneWithoutConsultationsInput
    doctor: UserCreateNestedOneWithoutConsultationsInput
    soapNote?: SOAPNoteCreateNestedOneWithoutConsultationInput
    prescription?: PrescriptionCreateNestedOneWithoutConsultationInput
    referral?: ReferralCreateNestedOneWithoutConsultationInput
    appointment?: AppointmentCreateNestedOneWithoutConsultationInput
  }

  export type ConsultationUncheckedCreateWithoutTranscriptsInput = {
    id?: string
    patientId: string
    doctorId: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    status?: $Enums.ConsultationStatus
    audioUrl?: string | null
    duration?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    soapNote?: SOAPNoteUncheckedCreateNestedOneWithoutConsultationInput
    prescription?: PrescriptionUncheckedCreateNestedOneWithoutConsultationInput
    referral?: ReferralUncheckedCreateNestedOneWithoutConsultationInput
    appointment?: AppointmentUncheckedCreateNestedOneWithoutConsultationInput
  }

  export type ConsultationCreateOrConnectWithoutTranscriptsInput = {
    where: ConsultationWhereUniqueInput
    create: XOR<ConsultationCreateWithoutTranscriptsInput, ConsultationUncheckedCreateWithoutTranscriptsInput>
  }

  export type ConsultationUpsertWithoutTranscriptsInput = {
    update: XOR<ConsultationUpdateWithoutTranscriptsInput, ConsultationUncheckedUpdateWithoutTranscriptsInput>
    create: XOR<ConsultationCreateWithoutTranscriptsInput, ConsultationUncheckedCreateWithoutTranscriptsInput>
    where?: ConsultationWhereInput
  }

  export type ConsultationUpdateToOneWithWhereWithoutTranscriptsInput = {
    where?: ConsultationWhereInput
    data: XOR<ConsultationUpdateWithoutTranscriptsInput, ConsultationUncheckedUpdateWithoutTranscriptsInput>
  }

  export type ConsultationUpdateWithoutTranscriptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumConsultationStatusFieldUpdateOperationsInput | $Enums.ConsultationStatus
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutConsultationsNestedInput
    doctor?: UserUpdateOneRequiredWithoutConsultationsNestedInput
    soapNote?: SOAPNoteUpdateOneWithoutConsultationNestedInput
    prescription?: PrescriptionUpdateOneWithoutConsultationNestedInput
    referral?: ReferralUpdateOneWithoutConsultationNestedInput
    appointment?: AppointmentUpdateOneWithoutConsultationNestedInput
  }

  export type ConsultationUncheckedUpdateWithoutTranscriptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumConsultationStatusFieldUpdateOperationsInput | $Enums.ConsultationStatus
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    soapNote?: SOAPNoteUncheckedUpdateOneWithoutConsultationNestedInput
    prescription?: PrescriptionUncheckedUpdateOneWithoutConsultationNestedInput
    referral?: ReferralUncheckedUpdateOneWithoutConsultationNestedInput
    appointment?: AppointmentUncheckedUpdateOneWithoutConsultationNestedInput
  }

  export type ConsultationCreateWithoutSoapNoteInput = {
    id?: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    status?: $Enums.ConsultationStatus
    audioUrl?: string | null
    duration?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: PatientCreateNestedOneWithoutConsultationsInput
    doctor: UserCreateNestedOneWithoutConsultationsInput
    transcripts?: TranscriptCreateNestedManyWithoutConsultationInput
    prescription?: PrescriptionCreateNestedOneWithoutConsultationInput
    referral?: ReferralCreateNestedOneWithoutConsultationInput
    appointment?: AppointmentCreateNestedOneWithoutConsultationInput
  }

  export type ConsultationUncheckedCreateWithoutSoapNoteInput = {
    id?: string
    patientId: string
    doctorId: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    status?: $Enums.ConsultationStatus
    audioUrl?: string | null
    duration?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transcripts?: TranscriptUncheckedCreateNestedManyWithoutConsultationInput
    prescription?: PrescriptionUncheckedCreateNestedOneWithoutConsultationInput
    referral?: ReferralUncheckedCreateNestedOneWithoutConsultationInput
    appointment?: AppointmentUncheckedCreateNestedOneWithoutConsultationInput
  }

  export type ConsultationCreateOrConnectWithoutSoapNoteInput = {
    where: ConsultationWhereUniqueInput
    create: XOR<ConsultationCreateWithoutSoapNoteInput, ConsultationUncheckedCreateWithoutSoapNoteInput>
  }

  export type ConsultationUpsertWithoutSoapNoteInput = {
    update: XOR<ConsultationUpdateWithoutSoapNoteInput, ConsultationUncheckedUpdateWithoutSoapNoteInput>
    create: XOR<ConsultationCreateWithoutSoapNoteInput, ConsultationUncheckedCreateWithoutSoapNoteInput>
    where?: ConsultationWhereInput
  }

  export type ConsultationUpdateToOneWithWhereWithoutSoapNoteInput = {
    where?: ConsultationWhereInput
    data: XOR<ConsultationUpdateWithoutSoapNoteInput, ConsultationUncheckedUpdateWithoutSoapNoteInput>
  }

  export type ConsultationUpdateWithoutSoapNoteInput = {
    id?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumConsultationStatusFieldUpdateOperationsInput | $Enums.ConsultationStatus
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutConsultationsNestedInput
    doctor?: UserUpdateOneRequiredWithoutConsultationsNestedInput
    transcripts?: TranscriptUpdateManyWithoutConsultationNestedInput
    prescription?: PrescriptionUpdateOneWithoutConsultationNestedInput
    referral?: ReferralUpdateOneWithoutConsultationNestedInput
    appointment?: AppointmentUpdateOneWithoutConsultationNestedInput
  }

  export type ConsultationUncheckedUpdateWithoutSoapNoteInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumConsultationStatusFieldUpdateOperationsInput | $Enums.ConsultationStatus
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transcripts?: TranscriptUncheckedUpdateManyWithoutConsultationNestedInput
    prescription?: PrescriptionUncheckedUpdateOneWithoutConsultationNestedInput
    referral?: ReferralUncheckedUpdateOneWithoutConsultationNestedInput
    appointment?: AppointmentUncheckedUpdateOneWithoutConsultationNestedInput
  }

  export type ConsultationCreateWithoutPrescriptionInput = {
    id?: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    status?: $Enums.ConsultationStatus
    audioUrl?: string | null
    duration?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: PatientCreateNestedOneWithoutConsultationsInput
    doctor: UserCreateNestedOneWithoutConsultationsInput
    transcripts?: TranscriptCreateNestedManyWithoutConsultationInput
    soapNote?: SOAPNoteCreateNestedOneWithoutConsultationInput
    referral?: ReferralCreateNestedOneWithoutConsultationInput
    appointment?: AppointmentCreateNestedOneWithoutConsultationInput
  }

  export type ConsultationUncheckedCreateWithoutPrescriptionInput = {
    id?: string
    patientId: string
    doctorId: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    status?: $Enums.ConsultationStatus
    audioUrl?: string | null
    duration?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transcripts?: TranscriptUncheckedCreateNestedManyWithoutConsultationInput
    soapNote?: SOAPNoteUncheckedCreateNestedOneWithoutConsultationInput
    referral?: ReferralUncheckedCreateNestedOneWithoutConsultationInput
    appointment?: AppointmentUncheckedCreateNestedOneWithoutConsultationInput
  }

  export type ConsultationCreateOrConnectWithoutPrescriptionInput = {
    where: ConsultationWhereUniqueInput
    create: XOR<ConsultationCreateWithoutPrescriptionInput, ConsultationUncheckedCreateWithoutPrescriptionInput>
  }

  export type PatientCreateWithoutPrescriptionsInput = {
    id?: string
    mrn: string
    firstName: string
    lastName: string
    dob: Date | string
    gender: $Enums.Gender
    phone?: string | null
    email?: string | null
    address?: string | null
    allergies?: PatientCreateallergiesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    consultations?: ConsultationCreateNestedManyWithoutPatientInput
    referrals?: ReferralCreateNestedManyWithoutPatientInput
    appointments?: AppointmentCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutPrescriptionsInput = {
    id?: string
    mrn: string
    firstName: string
    lastName: string
    dob: Date | string
    gender: $Enums.Gender
    phone?: string | null
    email?: string | null
    address?: string | null
    allergies?: PatientCreateallergiesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    consultations?: ConsultationUncheckedCreateNestedManyWithoutPatientInput
    referrals?: ReferralUncheckedCreateNestedManyWithoutPatientInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutPrescriptionsInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutPrescriptionsInput, PatientUncheckedCreateWithoutPrescriptionsInput>
  }

  export type ConsultationUpsertWithoutPrescriptionInput = {
    update: XOR<ConsultationUpdateWithoutPrescriptionInput, ConsultationUncheckedUpdateWithoutPrescriptionInput>
    create: XOR<ConsultationCreateWithoutPrescriptionInput, ConsultationUncheckedCreateWithoutPrescriptionInput>
    where?: ConsultationWhereInput
  }

  export type ConsultationUpdateToOneWithWhereWithoutPrescriptionInput = {
    where?: ConsultationWhereInput
    data: XOR<ConsultationUpdateWithoutPrescriptionInput, ConsultationUncheckedUpdateWithoutPrescriptionInput>
  }

  export type ConsultationUpdateWithoutPrescriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumConsultationStatusFieldUpdateOperationsInput | $Enums.ConsultationStatus
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutConsultationsNestedInput
    doctor?: UserUpdateOneRequiredWithoutConsultationsNestedInput
    transcripts?: TranscriptUpdateManyWithoutConsultationNestedInput
    soapNote?: SOAPNoteUpdateOneWithoutConsultationNestedInput
    referral?: ReferralUpdateOneWithoutConsultationNestedInput
    appointment?: AppointmentUpdateOneWithoutConsultationNestedInput
  }

  export type ConsultationUncheckedUpdateWithoutPrescriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumConsultationStatusFieldUpdateOperationsInput | $Enums.ConsultationStatus
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transcripts?: TranscriptUncheckedUpdateManyWithoutConsultationNestedInput
    soapNote?: SOAPNoteUncheckedUpdateOneWithoutConsultationNestedInput
    referral?: ReferralUncheckedUpdateOneWithoutConsultationNestedInput
    appointment?: AppointmentUncheckedUpdateOneWithoutConsultationNestedInput
  }

  export type PatientUpsertWithoutPrescriptionsInput = {
    update: XOR<PatientUpdateWithoutPrescriptionsInput, PatientUncheckedUpdateWithoutPrescriptionsInput>
    create: XOR<PatientCreateWithoutPrescriptionsInput, PatientUncheckedCreateWithoutPrescriptionsInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutPrescriptionsInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutPrescriptionsInput, PatientUncheckedUpdateWithoutPrescriptionsInput>
  }

  export type PatientUpdateWithoutPrescriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    mrn?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    dob?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: PatientUpdateallergiesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consultations?: ConsultationUpdateManyWithoutPatientNestedInput
    referrals?: ReferralUpdateManyWithoutPatientNestedInput
    appointments?: AppointmentUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutPrescriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    mrn?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    dob?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: PatientUpdateallergiesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consultations?: ConsultationUncheckedUpdateManyWithoutPatientNestedInput
    referrals?: ReferralUncheckedUpdateManyWithoutPatientNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type ConsultationCreateWithoutReferralInput = {
    id?: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    status?: $Enums.ConsultationStatus
    audioUrl?: string | null
    duration?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: PatientCreateNestedOneWithoutConsultationsInput
    doctor: UserCreateNestedOneWithoutConsultationsInput
    transcripts?: TranscriptCreateNestedManyWithoutConsultationInput
    soapNote?: SOAPNoteCreateNestedOneWithoutConsultationInput
    prescription?: PrescriptionCreateNestedOneWithoutConsultationInput
    appointment?: AppointmentCreateNestedOneWithoutConsultationInput
  }

  export type ConsultationUncheckedCreateWithoutReferralInput = {
    id?: string
    patientId: string
    doctorId: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    status?: $Enums.ConsultationStatus
    audioUrl?: string | null
    duration?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transcripts?: TranscriptUncheckedCreateNestedManyWithoutConsultationInput
    soapNote?: SOAPNoteUncheckedCreateNestedOneWithoutConsultationInput
    prescription?: PrescriptionUncheckedCreateNestedOneWithoutConsultationInput
    appointment?: AppointmentUncheckedCreateNestedOneWithoutConsultationInput
  }

  export type ConsultationCreateOrConnectWithoutReferralInput = {
    where: ConsultationWhereUniqueInput
    create: XOR<ConsultationCreateWithoutReferralInput, ConsultationUncheckedCreateWithoutReferralInput>
  }

  export type PatientCreateWithoutReferralsInput = {
    id?: string
    mrn: string
    firstName: string
    lastName: string
    dob: Date | string
    gender: $Enums.Gender
    phone?: string | null
    email?: string | null
    address?: string | null
    allergies?: PatientCreateallergiesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    consultations?: ConsultationCreateNestedManyWithoutPatientInput
    prescriptions?: PrescriptionCreateNestedManyWithoutPatientInput
    appointments?: AppointmentCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutReferralsInput = {
    id?: string
    mrn: string
    firstName: string
    lastName: string
    dob: Date | string
    gender: $Enums.Gender
    phone?: string | null
    email?: string | null
    address?: string | null
    allergies?: PatientCreateallergiesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    consultations?: ConsultationUncheckedCreateNestedManyWithoutPatientInput
    prescriptions?: PrescriptionUncheckedCreateNestedManyWithoutPatientInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutReferralsInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutReferralsInput, PatientUncheckedCreateWithoutReferralsInput>
  }

  export type ConsultationUpsertWithoutReferralInput = {
    update: XOR<ConsultationUpdateWithoutReferralInput, ConsultationUncheckedUpdateWithoutReferralInput>
    create: XOR<ConsultationCreateWithoutReferralInput, ConsultationUncheckedCreateWithoutReferralInput>
    where?: ConsultationWhereInput
  }

  export type ConsultationUpdateToOneWithWhereWithoutReferralInput = {
    where?: ConsultationWhereInput
    data: XOR<ConsultationUpdateWithoutReferralInput, ConsultationUncheckedUpdateWithoutReferralInput>
  }

  export type ConsultationUpdateWithoutReferralInput = {
    id?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumConsultationStatusFieldUpdateOperationsInput | $Enums.ConsultationStatus
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutConsultationsNestedInput
    doctor?: UserUpdateOneRequiredWithoutConsultationsNestedInput
    transcripts?: TranscriptUpdateManyWithoutConsultationNestedInput
    soapNote?: SOAPNoteUpdateOneWithoutConsultationNestedInput
    prescription?: PrescriptionUpdateOneWithoutConsultationNestedInput
    appointment?: AppointmentUpdateOneWithoutConsultationNestedInput
  }

  export type ConsultationUncheckedUpdateWithoutReferralInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumConsultationStatusFieldUpdateOperationsInput | $Enums.ConsultationStatus
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transcripts?: TranscriptUncheckedUpdateManyWithoutConsultationNestedInput
    soapNote?: SOAPNoteUncheckedUpdateOneWithoutConsultationNestedInput
    prescription?: PrescriptionUncheckedUpdateOneWithoutConsultationNestedInput
    appointment?: AppointmentUncheckedUpdateOneWithoutConsultationNestedInput
  }

  export type PatientUpsertWithoutReferralsInput = {
    update: XOR<PatientUpdateWithoutReferralsInput, PatientUncheckedUpdateWithoutReferralsInput>
    create: XOR<PatientCreateWithoutReferralsInput, PatientUncheckedCreateWithoutReferralsInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutReferralsInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutReferralsInput, PatientUncheckedUpdateWithoutReferralsInput>
  }

  export type PatientUpdateWithoutReferralsInput = {
    id?: StringFieldUpdateOperationsInput | string
    mrn?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    dob?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: PatientUpdateallergiesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consultations?: ConsultationUpdateManyWithoutPatientNestedInput
    prescriptions?: PrescriptionUpdateManyWithoutPatientNestedInput
    appointments?: AppointmentUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutReferralsInput = {
    id?: StringFieldUpdateOperationsInput | string
    mrn?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    dob?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: PatientUpdateallergiesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consultations?: ConsultationUncheckedUpdateManyWithoutPatientNestedInput
    prescriptions?: PrescriptionUncheckedUpdateManyWithoutPatientNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type ConsultationCreateWithoutAppointmentInput = {
    id?: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    status?: $Enums.ConsultationStatus
    audioUrl?: string | null
    duration?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: PatientCreateNestedOneWithoutConsultationsInput
    doctor: UserCreateNestedOneWithoutConsultationsInput
    transcripts?: TranscriptCreateNestedManyWithoutConsultationInput
    soapNote?: SOAPNoteCreateNestedOneWithoutConsultationInput
    prescription?: PrescriptionCreateNestedOneWithoutConsultationInput
    referral?: ReferralCreateNestedOneWithoutConsultationInput
  }

  export type ConsultationUncheckedCreateWithoutAppointmentInput = {
    id?: string
    patientId: string
    doctorId: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    status?: $Enums.ConsultationStatus
    audioUrl?: string | null
    duration?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transcripts?: TranscriptUncheckedCreateNestedManyWithoutConsultationInput
    soapNote?: SOAPNoteUncheckedCreateNestedOneWithoutConsultationInput
    prescription?: PrescriptionUncheckedCreateNestedOneWithoutConsultationInput
    referral?: ReferralUncheckedCreateNestedOneWithoutConsultationInput
  }

  export type ConsultationCreateOrConnectWithoutAppointmentInput = {
    where: ConsultationWhereUniqueInput
    create: XOR<ConsultationCreateWithoutAppointmentInput, ConsultationUncheckedCreateWithoutAppointmentInput>
  }

  export type PatientCreateWithoutAppointmentsInput = {
    id?: string
    mrn: string
    firstName: string
    lastName: string
    dob: Date | string
    gender: $Enums.Gender
    phone?: string | null
    email?: string | null
    address?: string | null
    allergies?: PatientCreateallergiesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    consultations?: ConsultationCreateNestedManyWithoutPatientInput
    prescriptions?: PrescriptionCreateNestedManyWithoutPatientInput
    referrals?: ReferralCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutAppointmentsInput = {
    id?: string
    mrn: string
    firstName: string
    lastName: string
    dob: Date | string
    gender: $Enums.Gender
    phone?: string | null
    email?: string | null
    address?: string | null
    allergies?: PatientCreateallergiesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    consultations?: ConsultationUncheckedCreateNestedManyWithoutPatientInput
    prescriptions?: PrescriptionUncheckedCreateNestedManyWithoutPatientInput
    referrals?: ReferralUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutAppointmentsInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutAppointmentsInput, PatientUncheckedCreateWithoutAppointmentsInput>
  }

  export type ConsultationUpsertWithoutAppointmentInput = {
    update: XOR<ConsultationUpdateWithoutAppointmentInput, ConsultationUncheckedUpdateWithoutAppointmentInput>
    create: XOR<ConsultationCreateWithoutAppointmentInput, ConsultationUncheckedCreateWithoutAppointmentInput>
    where?: ConsultationWhereInput
  }

  export type ConsultationUpdateToOneWithWhereWithoutAppointmentInput = {
    where?: ConsultationWhereInput
    data: XOR<ConsultationUpdateWithoutAppointmentInput, ConsultationUncheckedUpdateWithoutAppointmentInput>
  }

  export type ConsultationUpdateWithoutAppointmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumConsultationStatusFieldUpdateOperationsInput | $Enums.ConsultationStatus
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutConsultationsNestedInput
    doctor?: UserUpdateOneRequiredWithoutConsultationsNestedInput
    transcripts?: TranscriptUpdateManyWithoutConsultationNestedInput
    soapNote?: SOAPNoteUpdateOneWithoutConsultationNestedInput
    prescription?: PrescriptionUpdateOneWithoutConsultationNestedInput
    referral?: ReferralUpdateOneWithoutConsultationNestedInput
  }

  export type ConsultationUncheckedUpdateWithoutAppointmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumConsultationStatusFieldUpdateOperationsInput | $Enums.ConsultationStatus
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transcripts?: TranscriptUncheckedUpdateManyWithoutConsultationNestedInput
    soapNote?: SOAPNoteUncheckedUpdateOneWithoutConsultationNestedInput
    prescription?: PrescriptionUncheckedUpdateOneWithoutConsultationNestedInput
    referral?: ReferralUncheckedUpdateOneWithoutConsultationNestedInput
  }

  export type PatientUpsertWithoutAppointmentsInput = {
    update: XOR<PatientUpdateWithoutAppointmentsInput, PatientUncheckedUpdateWithoutAppointmentsInput>
    create: XOR<PatientCreateWithoutAppointmentsInput, PatientUncheckedCreateWithoutAppointmentsInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutAppointmentsInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutAppointmentsInput, PatientUncheckedUpdateWithoutAppointmentsInput>
  }

  export type PatientUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    mrn?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    dob?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: PatientUpdateallergiesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consultations?: ConsultationUpdateManyWithoutPatientNestedInput
    prescriptions?: PrescriptionUpdateManyWithoutPatientNestedInput
    referrals?: ReferralUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    mrn?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    dob?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: PatientUpdateallergiesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consultations?: ConsultationUncheckedUpdateManyWithoutPatientNestedInput
    prescriptions?: PrescriptionUncheckedUpdateManyWithoutPatientNestedInput
    referrals?: ReferralUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type UserCreateWithoutAuditLogsInput = {
    id?: string
    email: string
    name: string
    passwordHash: string
    role?: $Enums.UserRole
    specialty?: string | null
    licenseNumber?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    consultations?: ConsultationCreateNestedManyWithoutDoctorInput
  }

  export type UserUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    email: string
    name: string
    passwordHash: string
    role?: $Enums.UserRole
    specialty?: string | null
    licenseNumber?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    consultations?: ConsultationUncheckedCreateNestedManyWithoutDoctorInput
  }

  export type UserCreateOrConnectWithoutAuditLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
  }

  export type UserUpsertWithoutAuditLogsInput = {
    update: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type UserUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    specialty?: NullableStringFieldUpdateOperationsInput | string | null
    licenseNumber?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consultations?: ConsultationUpdateManyWithoutDoctorNestedInput
  }

  export type UserUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    specialty?: NullableStringFieldUpdateOperationsInput | string | null
    licenseNumber?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consultations?: ConsultationUncheckedUpdateManyWithoutDoctorNestedInput
  }

  export type ConsultationCreateManyDoctorInput = {
    id?: string
    patientId: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    status?: $Enums.ConsultationStatus
    audioUrl?: string | null
    duration?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AuditLogCreateManyUserInput = {
    id?: string
    action: string
    resourceType: string
    resourceId: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    timestamp?: Date | string
  }

  export type ConsultationUpdateWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumConsultationStatusFieldUpdateOperationsInput | $Enums.ConsultationStatus
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutConsultationsNestedInput
    transcripts?: TranscriptUpdateManyWithoutConsultationNestedInput
    soapNote?: SOAPNoteUpdateOneWithoutConsultationNestedInput
    prescription?: PrescriptionUpdateOneWithoutConsultationNestedInput
    referral?: ReferralUpdateOneWithoutConsultationNestedInput
    appointment?: AppointmentUpdateOneWithoutConsultationNestedInput
  }

  export type ConsultationUncheckedUpdateWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumConsultationStatusFieldUpdateOperationsInput | $Enums.ConsultationStatus
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transcripts?: TranscriptUncheckedUpdateManyWithoutConsultationNestedInput
    soapNote?: SOAPNoteUncheckedUpdateOneWithoutConsultationNestedInput
    prescription?: PrescriptionUncheckedUpdateOneWithoutConsultationNestedInput
    referral?: ReferralUncheckedUpdateOneWithoutConsultationNestedInput
    appointment?: AppointmentUncheckedUpdateOneWithoutConsultationNestedInput
  }

  export type ConsultationUncheckedUpdateManyWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumConsultationStatusFieldUpdateOperationsInput | $Enums.ConsultationStatus
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resourceType?: StringFieldUpdateOperationsInput | string
    resourceId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resourceType?: StringFieldUpdateOperationsInput | string
    resourceId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resourceType?: StringFieldUpdateOperationsInput | string
    resourceId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsultationCreateManyPatientInput = {
    id?: string
    doctorId: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    status?: $Enums.ConsultationStatus
    audioUrl?: string | null
    duration?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PrescriptionCreateManyPatientInput = {
    id?: string
    consultationId: string
    medications: JsonNullValueInput | InputJsonValue
    instructions?: string | null
    isApproved?: boolean
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReferralCreateManyPatientInput = {
    id?: string
    consultationId: string
    specialty: string
    reason: string
    urgency?: $Enums.Urgency
    notes?: string | null
    isApproved?: boolean
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentCreateManyPatientInput = {
    id?: string
    consultationId: string
    scheduledAt: Date | string
    type: $Enums.AppointmentType
    reason?: string | null
    isApproved?: boolean
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConsultationUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumConsultationStatusFieldUpdateOperationsInput | $Enums.ConsultationStatus
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctor?: UserUpdateOneRequiredWithoutConsultationsNestedInput
    transcripts?: TranscriptUpdateManyWithoutConsultationNestedInput
    soapNote?: SOAPNoteUpdateOneWithoutConsultationNestedInput
    prescription?: PrescriptionUpdateOneWithoutConsultationNestedInput
    referral?: ReferralUpdateOneWithoutConsultationNestedInput
    appointment?: AppointmentUpdateOneWithoutConsultationNestedInput
  }

  export type ConsultationUncheckedUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumConsultationStatusFieldUpdateOperationsInput | $Enums.ConsultationStatus
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transcripts?: TranscriptUncheckedUpdateManyWithoutConsultationNestedInput
    soapNote?: SOAPNoteUncheckedUpdateOneWithoutConsultationNestedInput
    prescription?: PrescriptionUncheckedUpdateOneWithoutConsultationNestedInput
    referral?: ReferralUncheckedUpdateOneWithoutConsultationNestedInput
    appointment?: AppointmentUncheckedUpdateOneWithoutConsultationNestedInput
  }

  export type ConsultationUncheckedUpdateManyWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumConsultationStatusFieldUpdateOperationsInput | $Enums.ConsultationStatus
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrescriptionUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    medications?: JsonNullValueInput | InputJsonValue
    instructions?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consultation?: ConsultationUpdateOneRequiredWithoutPrescriptionNestedInput
  }

  export type PrescriptionUncheckedUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    consultationId?: StringFieldUpdateOperationsInput | string
    medications?: JsonNullValueInput | InputJsonValue
    instructions?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrescriptionUncheckedUpdateManyWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    consultationId?: StringFieldUpdateOperationsInput | string
    medications?: JsonNullValueInput | InputJsonValue
    instructions?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReferralUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    urgency?: EnumUrgencyFieldUpdateOperationsInput | $Enums.Urgency
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consultation?: ConsultationUpdateOneRequiredWithoutReferralNestedInput
  }

  export type ReferralUncheckedUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    consultationId?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    urgency?: EnumUrgencyFieldUpdateOperationsInput | $Enums.Urgency
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReferralUncheckedUpdateManyWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    consultationId?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    urgency?: EnumUrgencyFieldUpdateOperationsInput | $Enums.Urgency
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumAppointmentTypeFieldUpdateOperationsInput | $Enums.AppointmentType
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consultation?: ConsultationUpdateOneRequiredWithoutAppointmentNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    consultationId?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumAppointmentTypeFieldUpdateOperationsInput | $Enums.AppointmentType
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    consultationId?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumAppointmentTypeFieldUpdateOperationsInput | $Enums.AppointmentType
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TranscriptCreateManyConsultationInput = {
    id?: string
    text: string
    speaker: $Enums.Speaker
    timestamp?: Date | string
    confidence?: number | null
  }

  export type TranscriptUpdateWithoutConsultationInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    speaker?: EnumSpeakerFieldUpdateOperationsInput | $Enums.Speaker
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type TranscriptUncheckedUpdateWithoutConsultationInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    speaker?: EnumSpeakerFieldUpdateOperationsInput | $Enums.Speaker
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type TranscriptUncheckedUpdateManyWithoutConsultationInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    speaker?: EnumSpeakerFieldUpdateOperationsInput | $Enums.Speaker
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}