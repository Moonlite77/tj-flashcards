'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Shuffle, ChevronLeft, ChevronRight } from 'lucide-react'

interface Flashcard {
  id: number
  image: string
  name: string
  sku: string
}

const flashcardsData: Record<string, Flashcard[]> = {
  apples: [
    { id: 1, image: 'https://imagedelivery.net/_3BvaaU0nebybABLZIjMPA/74813864-b7b7-43ea-c921-2e0f9da62e00/public', name: 'Cosmic Apple', sku: '3507' },
    { id: 5, image: 'https://imagedelivery.net/_3BvaaU0nebybABLZIjMPA/3430c67b-a5ea-4af2-eff8-35a416d64900/public', name: 'Envy Apple', sku: '3616' },
    { id: 6, image: 'https://imagedelivery.net/_3BvaaU0nebybABLZIjMPA/4290ba2b-6b52-4b89-4ded-546ecee29800/public', name: 'Fuji Apple', sku: '4131' },
    { id: 7, image: 'https://imagedelivery.net/_3BvaaU0nebybABLZIjMPA/0f8b211a-7b7d-47af-93ad-03728bd6de00/public', name: 'Gala Apple', sku: '4135' },
    { id: 8, image: 'https://imagedelivery.net/_3BvaaU0nebybABLZIjMPA/33af042c-34a2-4dfa-9ebe-20e29e219000/public', name: 'Honeycrisp Apple', sku: '3283' },
    { id: 9, image: 'https://imagedelivery.net/_3BvaaU0nebybABLZIjMPA/51cd5707-5113-45b9-6b0a-4899449f0400/public', name: 'Granny Smith Apple', sku: '4017' },
    { id: 10, image: 'https://imagedelivery.net/_3BvaaU0nebybABLZIjMPA/8ee671c4-12b0-41d2-76fa-dfca46bb1c00/public', name: 'Kanzi apple', sku: '3605' },
    { id: 11, image: 'https://imagedelivery.net/_3BvaaU0nebybABLZIjMPA/ca1da2ab-5a6a-4db7-cbba-cac73da98500/public', name: 'Lucy Glo apple', sku: '3527' },
    { id: 12, image: 'https://imagedelivery.net/_3BvaaU0nebybABLZIjMPA/7085c284-48b7-4c55-6544-5c72c7a9db00/public', name: 'Opal apple', sku: '3618' },
    { id: 13, image: 'https://imagedelivery.net/_3BvaaU0nebybABLZIjMPA/8c4d037b-3752-443f-5657-7edd08cc3000/public', name: 'Pink Lady apple', sku: '4130' },
  ],
  'stone fruit': [
    { id: 1, image: 'https://imagedelivery.net/_3BvaaU0nebybABLZIjMPA/44c7c201-ae6a-46ce-bb3b-243f262b4d00/public', name: 'Plum', sku: '4440' },
    { id: 1, image: 'https://imagedelivery.net/_3BvaaU0nebybABLZIjMPA/8924c979-1440-4cef-083d-04de0e8dcd00/public', name: 'White Nectarine', sku: '3035' },
    { id: 1, image: 'https://imagedelivery.net/_3BvaaU0nebybABLZIjMPA/a472d666-7d28-40e3-adb9-22c31a819000/public', name: 'Yellow Nectarine', sku: '4378' },
    { id: 1, image: 'https://imagedelivery.net/_3BvaaU0nebybABLZIjMPA/0ca57e08-9b57-4e1d-e9ba-b50975223b00/public', name: 'White Peach', sku: '3314' },
    { id: 1, image: 'https://imagedelivery.net/_3BvaaU0nebybABLZIjMPA/0cf38360-1485-4848-0b26-79be04a01700/public', name: 'plumcot', sku: '3278' },
    { id: 1, image: 'https://imagedelivery.net/_3BvaaU0nebybABLZIjMPA/a68b21b1-1cc0-4dee-7d77-62560f8e2400/public', name: 'Yellow Peach', sku: '4044' },
    { id: 1, image: 'https://imagedelivery.net/_3BvaaU0nebybABLZIjMPA/44c7c201-ae6a-46ce-bb3b-243f262b4d00/public', name: 'red plumcot', sku: '4438' },
  ],
  pears: [
    { id: 1, image: 'https://imagedelivery.net/_3BvaaU0nebybABLZIjMPA/a07cd144-daeb-460a-5c24-7c5e5ae8fc00/public', name: 'D\'anjou', sku: '4416' },
    { id: 1, image: 'https://imagedelivery.net/_3BvaaU0nebybABLZIjMPA/c42d4e52-e057-41a6-827f-676068876000/public', name: 'Bosc', sku: '4413' },
    { id: 1, image: 'https://imagedelivery.net/_3BvaaU0nebybABLZIjMPA/0d2f6188-153f-4669-7faf-418b83b3d300/public', name: 'Bartlet', sku: '4409' },
    { id: 1, image: 'https://imagedelivery.net/_3BvaaU0nebybABLZIjMPA/61082e4f-b6f3-4319-8823-5c7001f06400/public', name: 'Asian Pear', sku: '4408' },
  ],
  'onions/aeromatics': [
    { id: 1, image: 'https://imagedelivery.net/_3BvaaU0nebybABLZIjMPA/df6d9b7d-3d25-409c-902b-91c9307c0b00/public', name: 'Yellow Onion', sku: '4093' },
    { id: 1, image: 'https://imagedelivery.net/_3BvaaU0nebybABLZIjMPA/65b362da-be82-4f06-7622-778edffcff00/public', name: 'Sweet Onion', sku: '4166' },
    { id: 1, image: 'https://imagedelivery.net/_3BvaaU0nebybABLZIjMPA/b1b6a931-73fa-447b-b41a-ceaa01b70200/public', name: 'Red Onion', sku: '4082' },
    { id: 1, image: 'https://imagedelivery.net/_3BvaaU0nebybABLZIjMPA/95fb7be3-5a47-4452-2e31-ff929cfdb800/public', name: 'White Onion', sku: '4663' },
    { id: 1, image: 'https://imagedelivery.net/_3BvaaU0nebybABLZIjMPA/1d382ef2-012b-46c2-f00a-5ba4e438e100/public', name: 'Shallot', sku: '4662' },
    { id: 1, image: 'https://imagedelivery.net/_3BvaaU0nebybABLZIjMPA/99785298-b48a-4773-ae15-05416e3aef00/public', name: 'Garlic', sku: '4608' },
  ],
  'regional vegetables': [
    { id: 1, image: 'https://imagedelivery.net/_3BvaaU0nebybABLZIjMPA/fff076ab-e1c5-4f44-5907-4a63d0663000/public', name: 'Cucumber', sku: '4062' },
    { id: 1, image: 'https://imagedelivery.net/_3BvaaU0nebybABLZIjMPA/67cb57d8-158c-4fb2-484b-c4561b9d3f00/public', name: 'Yellow Squash', sku: '4782' },
    { id: 1, image: 'https://imagedelivery.net/_3BvaaU0nebybABLZIjMPA/9032383c-febb-4a3a-a7c2-1d23833caf00/public', name: 'Zucchini', sku: '4067' },
  ],
  'other veggies': [
    { id: 1, image: 'https://imagedelivery.net/_3BvaaU0nebybABLZIjMPA/9032383c-febb-4a3a-a7c2-1d23833caf00/public', name: 'Artichoke', sku: '4762' },
    { id: 1, image: 'https://imagedelivery.net/_3BvaaU0nebybABLZIjMPA/9032383c-febb-4a3a-a7c2-1d23833caf00/public', name: 'Asparagus', sku: '4067' },
    { id: 1, image: 'https://imagedelivery.net/_3BvaaU0nebybABLZIjMPA/9032383c-febb-4a3a-a7c2-1d23833caf00/public', name: 'Purple Asparagus', sku: '3079' },
    { id: 1, image: 'https://imagedelivery.net/_3BvaaU0nebybABLZIjMPA/9032383c-febb-4a3a-a7c2-1d23833caf00/public', name: 'Corn on the cob', sku: '4077' },
    { id: 1, image: 'https://imagedelivery.net/_3BvaaU0nebybABLZIjMPA/9032383c-febb-4a3a-a7c2-1d23833caf00/public', name: 'English Cucumber', sku: '4593' },
    { id: 1, image: 'https://imagedelivery.net/_3BvaaU0nebybABLZIjMPA/9032383c-febb-4a3a-a7c2-1d23833caf00/public', name: 'Eggplant', sku: '4081' },
    { id: 1, image: 'https://imagedelivery.net/_3BvaaU0nebybABLZIjMPA/9032383c-febb-4a3a-a7c2-1d23833caf00/public', name: 'Beefsteak tomato', sku: '4799' },
    { id: 1, image: 'https://imagedelivery.net/_3BvaaU0nebybABLZIjMPA/9032383c-febb-4a3a-a7c2-1d23833caf00/public', name: 'Roma tomato', sku: '4087' },
    { id: 1, image: 'https://imagedelivery.net/_3BvaaU0nebybABLZIjMPA/9032383c-febb-4a3a-a7c2-1d23833caf00/public', name: 'Avacado', sku: '4225' },
    { id: 1, image: 'https://imagedelivery.net/_3BvaaU0nebybABLZIjMPA/9032383c-febb-4a3a-a7c2-1d23833caf00/public', name: 'Jalapeno', sku: '4693' },
  ],
  melons: [],
  citrus: [],
  'other fruits': [
    { id: 2, image: 'https://imagedelivery.net/_3BvaaU0nebybABLZIjMPA/f8bc313d-54c4-4ce5-75f9-4b204b5cb600/public', name: 'Banana', sku: '4011' },
  ],
  peppers: [],
  potatoes: [
    { id: 3, image: 'https://imagedelivery.net/_3BvaaU0nebybABLZIjMPA/37aaf1f6-7341-4540-3622-3bcf1817f000/public', name: 'Japanese Sweet Potato', sku: '3288' },
    { id: 4, image: 'https://imagedelivery.net/_3BvaaU0nebybABLZIjMPA/71a70b82-fb51-499a-fcb0-a0c559c2bc00/public', name: 'Russets', sku: '4072' },
  ],
  'squash/gourds/pumpkins': [],
}

export default function Flashcards() {
  const categories = Object.keys(flashcardsData)
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0)
  const [currentCard, setCurrentCard] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [message, setMessage] = useState('')
  const [isSkuRevealed, setIsSkuRevealed] = useState(false)
  const [shuffledCards, setShuffledCards] = useState<Flashcard[]>([])

  useEffect(() => {
    shuffleCards()
  }, [currentCategoryIndex])

  const handleCategoryChange = (index: number) => {
    setCurrentCategoryIndex(index)
    setCurrentCard(0)
    setUserInput('')
    setMessage('')
    setIsSkuRevealed(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (userInput === shuffledCards[currentCard].sku) {
      setMessage('Correct! Moving to next card...')
      setTimeout(() => {
        setCurrentCard((prev) => (prev + 1) % shuffledCards.length)
        setUserInput('')
        setMessage('')
        setIsSkuRevealed(false)
      }, 1500)
    } else {
      setMessage('Incorrect. Try again!')
    }
  }

  const handleRevealSku = () => {
    setIsSkuRevealed(true)
    setMessage(`The correct SKU is: ${shuffledCards[currentCard].sku}`)
  }

  const shuffleCards = () => {
    const currentCategory = categories[currentCategoryIndex]
    const shuffled = [...flashcardsData[currentCategory]].sort(() => Math.random() - 0.5)
    setShuffledCards(shuffled)
    setCurrentCard(0)
    setUserInput('')
    setMessage('')
    setIsSkuRevealed(false)
  }

  const switchCategory = (direction: 'prev' | 'next') => {
    setCurrentCategoryIndex((prevIndex) => {
      if (direction === 'prev') {
        return prevIndex > 0 ? prevIndex - 1 : categories.length - 1
      } else {
        return (prevIndex + 1) % categories.length
      }
    })
  }

  return (
    <div className="trader-joes-bg min-h-screen p-4 md:p-8 flex flex-col items-center">
      <h1 className="trader-joes-title text-center mb-6">Fruit and Veggie SKUs Flashcards</h1>
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4 order-first md:order-last mb-4 md:mb-0">
          <div className="md:hidden flex items-center mb-2">
            <Button
              onClick={() => switchCategory('prev')}
              className="p-2 bg-red-600 text-white hover:bg-red-700"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex-grow text-center font-bold">
              {categories[currentCategoryIndex]}
            </div>
            <Button
              onClick={() => switchCategory('next')}
              className="p-2 bg-red-600 text-white hover:bg-red-700"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="h-[70vh] rounded-md border p-4 hidden md:block">
            <div className="flex flex-col">
              {categories.map((category, index) => (
                <Button
                  key={category}
                  onClick={() => handleCategoryChange(index)}
                  className={`whitespace-normal justify-start mb-2 ${
                    currentCategoryIndex === index ? 'bg-red-600 text-white' : 'bg-white text-red-600'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
        <div className="w-full md:w-3/4 flex flex-col items-center">
          {shuffledCards.length > 0 ? (
            <Card className="w-full max-w-md mx-auto h-[500px] flex flex-col">
              <CardContent className="flex flex-col items-center p-4 h-full justify-between">
                <h2 className="text-2xl font-bold mb-4 text-center">{shuffledCards[currentCard].name}</h2>
                <div className="w-full max-w-xs mx-auto aspect-square relative mb-4 h-48">
                  <Image
                    src={shuffledCards[currentCard].image}
                    alt={shuffledCards[currentCard].name}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg"
                  />
                </div>
                <form onSubmit={handleSubmit} className="w-full space-y-1">
                  <Input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Enter SKU"
                    className="trader-joes-input text-center"
                  />
                  <div className="flex space-x-2">
                    <Button type="submit" className="trader-joes-button flex-1">
                      Submit
                    </Button>
                    <Button
                      type="button"
                      onClick={handleRevealSku}
                      className="trader-joes-button flex-1"
                      disabled={isSkuRevealed}
                    >
                      Reveal SKU
                    </Button>
                  </div>
                </form>
                {message && (
                  <p className={`mt-2 text-center ${message.includes('Correct') ? 'text-green-600' : 'text-red-600'}`}>
                    {message}
                  </p>
                )}
                <Button onClick={shuffleCards} className="trader-joes-button mt-2 w-full">
                  <Shuffle className="mr-2 h-4 w-4" /> Shuffle Cards
                </Button>
              </CardContent>
            </Card>
          ) : (
            <p className="text-center mt-4">No flashcards available for this category yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}

