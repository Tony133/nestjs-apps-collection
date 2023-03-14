import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesResolver } from './articles.resolver';
import { ArticlesService } from './articles.service';

describe('ArticlesResolver', () => {
  let resolver: ArticlesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticlesResolver, ArticlesService],
    }).compile();

    resolver = module.get<ArticlesResolver>(ArticlesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
