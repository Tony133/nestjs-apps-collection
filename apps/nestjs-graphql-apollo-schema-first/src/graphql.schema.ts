
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateArticleInput {
    title: string;
    description: string;
    users: string[];
}

export class UpdateArticleInput {
    title: string;
    description: string;
    users: string[];
}

export class CreateRoleInput {
    name: string;
}

export class UpdateRoleInput {
    name: string;
}

export class CreateUserInput {
    name: string;
    email: string;
    username: string;
    password: string;
    roles: string[];
}

export class UpdateUserInput {
    name: string;
    email: string;
    username: string;
    password: string;
    roles: string[];
}

export class Article {
    id: string;
    title: string;
    description: string;
    users: User[];
}

export abstract class IQuery {
    abstract articles(): Nullable<Article>[] | Promise<Nullable<Article>[]>;

    abstract article(id: number): Nullable<Article> | Promise<Nullable<Article>>;

    abstract roles(): Nullable<Roles>[] | Promise<Nullable<Roles>[]>;

    abstract role(id: number): Nullable<Roles> | Promise<Nullable<Roles>>;

    abstract users(): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract user(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createArticle(createArticleInput: CreateArticleInput): Article | Promise<Article>;

    abstract updateArticle(id: number, updateArticleInput: UpdateArticleInput): Article | Promise<Article>;

    abstract removeArticle(id: number): Nullable<Article> | Promise<Nullable<Article>>;

    abstract createRole(createRoleInput: CreateRoleInput): Roles | Promise<Roles>;

    abstract updateRole(id: number, updateRoleInput: UpdateRoleInput): Roles | Promise<Roles>;

    abstract removeRole(id: number): Nullable<Roles> | Promise<Nullable<Roles>>;

    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

    abstract updateUser(id: number, updateUserInput: UpdateUserInput): User | Promise<User>;

    abstract removeUser(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export class Roles {
    id: string;
    name: string;
    users: User[];
}

export class User {
    id?: Nullable<string>;
    name: string;
    email: string;
    username: string;
    password: string;
    roles: Roles[];
}

type Nullable<T> = T | null;
