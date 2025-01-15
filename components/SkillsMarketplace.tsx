import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type SkillListing = {
  id: string
  title: string
  description: string
  skills: string[]
  user: {
    name: string
    avatar: string
  }
  rate: string
}

type SkillsMarketplaceProps = {
  listings: SkillListing[]
}

export function SkillsMarketplace({ listings }: SkillsMarketplaceProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {listings.map((listing) => (
        <Card key={listing.id}>
          <CardHeader>
            <CardTitle>{listing.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{listing.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {listing.skills.map((skill) => (
                <Badge key={skill} variant="secondary">{skill}</Badge>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src={listing.user.avatar} alt={listing.user.name} />
                  <AvatarFallback>{listing.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <span className="font-semibold">{listing.user.name}</span>
              </div>
              <span className="font-semibold">{listing.rate}</span>
            </div>
            <Button className="w-full mt-4">Contact</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

