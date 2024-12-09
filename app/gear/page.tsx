import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const gearItems = [
  { name: "Trader Joe's Reusable Grocery Bag", description: "Eco-friendly and durable for all your shopping needs." },
  { name: "Trader Joe's Insulated Lunch Bag", description: "Perfect for keeping your lunch fresh and cool." },
  { name: "Trader Joe's Apron", description: "Stay clean while cooking up your favorite TJ's recipes." },
  { name: "Trader Joe's Reusable Produce Bags", description: "Reduce plastic waste with these mesh produce bags." },
  { name: "Trader Joe's Insulated Water Bottle", description: "Stay hydrated in style with this BPA-free water bottle." },
]

export default function RecommendedGear() {
  return (
    <div className="trader-joes-bg min-h-screen p-8 flex flex-col items-center">
      <h1 className="trader-joes-title text-center mb-8">Recommended Gear</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
        {gearItems.map((item, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

