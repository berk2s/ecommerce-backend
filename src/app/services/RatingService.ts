// array olarak gelen review ve rating değerleri burada manipulate edilecek.
import { getManager } from 'typeorm'
import { Product } from '../entity/Product'
import { Rating } from '../entity/Rating'
import { CreateRatingDto, UpdateRatingDto } from '../models/Rating'
import { CreateProductDto, UpdateProductDto } from '../models/Product'

class RatingService{
    constructor() {}

    public async createRating(createRatingDto: CreateRatingDto) {

        // const productWithReview = await manager.findOne(Product, productId, {
        //     relations: ['reviews']
        // })

        const manager = getManager()
        const productId = createRatingDto.productID;

        const product: Product = await manager.findOne(Product, productId);

        const rating = new Rating();
        // TODO: implement user id
        rating.userReview = createRatingDto.userReview
        rating.userRating = createRatingDto.userRating
        rating.product = product;

        const savedReview = manager.save(rating);

        return savedReview;
        // const manager = getManager()

        // const rating = new Rating()
        // const product = new Product()


        // rating.productName = CreateRatingDto.productName // sağdaki postmandan
        // product.userRatings = []
        // product.userReviews = []
        // // rating.userRatings = CreateRatingDto.userRating
        // // rating.userReviews = CreateRatingDto.userReview

        // const userRatings = await manager.findByIds(Rating, CreateRatingDto.userRating)

        // userRatings.forEach((pUserRating) => {
        //     product.userRatings = [...product.userRatings, pUserRating]
        // })

        // const userReviews = await manager.findByIds(Rating, CreateRatingDto.userReview)

        // userReviews.forEach((pUserReview) => {
        //     product.userReviews = [...product.userReviews, pUserReview]
        // })

        // const savedProduct = manager.save(product)

        // return savedProduct
    }
}
