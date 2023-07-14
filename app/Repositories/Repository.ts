import { LucidModel } from "@ioc:Adonis/Lucid/Orm"
import { GetAllOptions, StoreOptions, GetOneOptions, UpdateOneOptions, DeleteOneOptions } from "Contracts/repository"

export default abstract class Repository<T> {
    public abstract model: LucidModel

    public async getAll(options: GetAllOptions) {
        return await this.model.query()
            .orderBy(options.sort.column, options.sort.direction)
            .paginate(options.page.number, options.page.size)
    }

    public async store(options: StoreOptions): Promise<T> {
        return await this.model.create(options.values) as T
    }

    public async getOne(options: GetOneOptions) {
        return await this.model.findByOrFail('id', options.filter.id)
    }

    public async updateOne(options: UpdateOneOptions & { target?: typeof this.model }) {
        if (!options.target) {
            options.target = await this.getOne({ filter: options.filter })
        }

        await options.target.merge(options.values).save()

        return options.target
    }

    public async deleteOne(options: DeleteOneOptions & { target?: typeof this.model }) {
        if (!options.target) {
            options.target = await this.getOne({ filter: options.filter })
        }

        await options.target.delete()

        return options.target
    }
}