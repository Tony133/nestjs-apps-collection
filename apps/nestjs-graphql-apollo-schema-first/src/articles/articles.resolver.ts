import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ArticlesService } from './articles.service';
import { ArticlesArgs, CreateArticleInput, UpdateArticleInput } from './dto';

@Resolver('Articles')
export class ArticlesResolver {
  constructor(private readonly articlesService: ArticlesService) {}

  @Mutation('createArticle')
  create(@Args('createArticleInput') createArticleInput: CreateArticleInput) {
    return this.articlesService.create(createArticleInput);
  }

  @Query('articles')
  findAll(@Args() articlesArgs: ArticlesArgs) {
    return this.articlesService.findAll(articlesArgs);
  }

  @Query('article')
  findOne(@Args('id') id: number) {
    return this.articlesService.findOne(id);
  }

  @Mutation('updateArticle')
  update(@Args('id') id: number, @Args('updateArticleInput') updateArticleInput: UpdateArticleInput) {
    return this.articlesService.update(id, updateArticleInput);
  }

  @Mutation('removeArticle')
  remove(@Args('id') id: number) {
    return this.articlesService.remove(id);
  }
}
