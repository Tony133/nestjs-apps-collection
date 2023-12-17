import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePostInput, UpdatePostInput, PostsArgs } from './dto';
import { Posts } from './entities/posts.entity';
import { PostsService } from './posts.service';

@Resolver()
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => [Posts])
  public async posts(@Args() postsArgs: PostsArgs): Promise<Posts[]> {
    return this.postsService.findAll(postsArgs);
  }

  @Query(() => Posts)
  public async post(@Args('id') id: string): Promise<Posts> {
    return await this.postsService.findOneById(id);
  }

  @Mutation(() => Posts)
  public async createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
  ): Promise<Posts> {
    return await this.postsService.create(createPostInput);
  }

  @Mutation(() => Posts)
  public async updatePost(
    @Args('id') id: string,
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
  ): Promise<Posts> {
    return await this.postsService.update(id, updatePostInput);
  }
}
