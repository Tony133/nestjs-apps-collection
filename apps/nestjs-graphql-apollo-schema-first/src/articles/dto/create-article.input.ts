import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateArticleInput {

    @Field()
    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @Field()
    @MaxLength(200)
    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @Field()
    @IsString({ each: true })
    readonly users: string[];  
}