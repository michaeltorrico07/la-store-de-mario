import { useState } from 'react'
import type { NewProductSchema, ProductSchema } from '../schemas/productSchema'
import { api } from '../../../../infrastructure/services/api'
import type { Product } from '../management'

export const useManagement = () => {
    const [loading, setLoading] = useState(false)
    const SubmitNewProduct = async (data: NewProductSchema) => {
        setLoading(true)
        const formData = new FormData();
        formData.append("image", data.image);
        const productData = {
            name: data.name.trim(),
            description: data.description.trim(),
            price: Number(data.price),
            category: data.category,
            inMenu: data.inMenu,
        };
        formData.append("productData", JSON.stringify(productData));
        try {
            await api.post('/product', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
            window.location.reload(); // Refresh the page to see the new product
        }
    }

    const SubmitUpdateProduct = async (data: ProductSchema, product: Product) => {
        setLoading(true)
        if (!data.image || !(data.image instanceof File)) {
            data.image = product.image as string;
        }
        const formData = new FormData();
        formData.append("image", data.image);
        const productData = {
            name: data.name.trim(),
            description: data.description.trim(),
            price: Number(data.price),
            category: data.category,
            inMenu: data.inMenu,
        };
        formData.append("productData", JSON.stringify(productData));
        try {
            await api.put(`/product/${product.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
            window.location.reload(); // Refresh the page to see the updated product
        }
    }

    return { SubmitNewProduct, SubmitUpdateProduct, loading }
}