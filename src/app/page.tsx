'use client'

import { useState, useEffect } from 'react'
import { Search, ShoppingCart, Star, Filter, Grid, List, Heart, Eye, Plus, Minus, X } from 'lucide-react'
import { mockProducts, categories } from '@/lib/data'
import { useCart } from '@/hooks/useCart'
import { Product, Category } from '@/lib/types'

export default function LasyStore() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showCart, setShowCart] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState(mockProducts)
  const { cart, addToCart, removeFromCart, updateQuantity, getItemQuantity } = useCart()

  // Filter products based on category and search
  useEffect(() => {
    let filtered = mockProducts

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredProducts(filtered)
  }, [selectedCategory, searchQuery])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Lasy Store
                </h1>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Powered by Sra AI
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {viewMode === 'grid' ? <List className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
              </button>
              
              <button
                onClick={() => setShowCart(true)}
                className="relative p-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                {cart.itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 sticky top-24">
              <h2 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Categorias
              </h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id as Category)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-between ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="font-medium">{category.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      selectedCategory === category.id
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-400'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                  {selectedCategory === 'all' ? 'Todos os Produtos' : categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode={viewMode}
                  onAddToCart={addToCart}
                  cartQuantity={getItemQuantity(product.id)}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  Nenhum produto encontrado
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Tente ajustar seus filtros ou termo de busca
                </p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowCart(false)} />
          <div className="absolute right-0 top-0 h-full w-96 bg-white dark:bg-slate-800 shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                Carrinho ({cart.itemCount})
              </h2>
              <button
                onClick={() => setShowCart(false)}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600 dark:text-slate-400">Seu carrinho está vazio</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.items.map((item) => (
                    <div key={item.product.id} className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-slate-800 dark:text-slate-200 text-sm">
                          {item.product.name}
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
                          {formatPrice(item.product.price)}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-6 h-6 bg-slate-200 dark:bg-slate-600 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-500"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-medium text-slate-800 dark:text-slate-200 min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 bg-slate-200 dark:bg-slate-600 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-500"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="ml-auto text-red-500 hover:text-red-600 text-xs"
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.items.length > 0 && (
              <div className="border-t border-slate-200 dark:border-slate-700 p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-slate-800 dark:text-slate-200">Total:</span>
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    {formatPrice(cart.total)}
                  </span>
                </div>
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-200">
                  Finalizar Compra
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

interface ProductCardProps {
  product: Product
  viewMode: 'grid' | 'list'
  onAddToCart: (product: Product) => void
  cartQuantity: number
}

function ProductCard({ product, viewMode, onAddToCart, cartQuantity }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  if (viewMode === 'list') {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
        <div className="flex gap-6">
          <div className="relative flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-32 h-32 object-cover rounded-xl"
            />
            {product.badge && (
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                {product.badge}
              </span>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  {product.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                  {product.description}
                </p>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {product.rating} ({product.reviews} avaliações)
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-slate-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                
                <button
                  onClick={() => onAddToCart(product)}
                  disabled={!product.inStock}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500 text-white px-6 py-2 rounded-xl font-medium transition-all duration-200 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  {product.inStock ? 'Adicionar' : 'Indisponível'}
                  {cartQuantity > 0 && (
                    <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                      {cartQuantity}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 group">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            {product.badge}
          </span>
        )}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-slate-600 hover:text-red-500 transition-colors">
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-slate-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-slate-600 dark:text-slate-400 ml-1">
            ({product.reviews})
          </span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-slate-500 line-through ml-2">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
        
        <button
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500 text-white py-2 rounded-xl font-medium transition-all duration-200 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          {product.inStock ? 'Adicionar' : 'Indisponível'}
          {cartQuantity > 0 && (
            <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
              {cartQuantity}
            </span>
          )}
        </button>
      </div>
    </div>
  )
}