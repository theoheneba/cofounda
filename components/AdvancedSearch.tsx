import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function AdvancedSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [industry, setIndustry] = useState('')
  const [skills, setSkills] = useState<string[]>([])

  const handleSearch = () => {
    // Implement search logic here
    console.log('Searching with:', { searchTerm, industry, skills })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Advanced Search</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="search">Search Term</Label>
            <Input
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter keywords..."
            />
          </div>
          <div>
            <Label htmlFor="industry">Industry</Label>
            <Select value={industry} onValueChange={setIndustry}>
              <SelectTrigger id="industry">
                <SelectValue placeholder="Select an industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tech">Technology</SelectItem>
                <SelectItem value="health">Healthcare</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="education">Education</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Skills</Label>
            <div className="grid grid-cols-2 gap-2">
              {['Programming', 'Marketing', 'Design', 'Sales'].map((skill) => (
                <div key={skill} className="flex items-center space-x-2">
                  <Checkbox
                    id={skill}
                    checked={skills.includes(skill)}
                    onCheckedChange={(checked) => {
                      setSkills(
                        checked
                          ? [...skills, skill]
                          : skills.filter((s) => s !== skill)
                      )
                    }}
                  />
                  <Label htmlFor={skill}>{skill}</Label>
                </div>
              ))}
            </div>
          </div>
          <Button onClick={handleSearch} className="w-full">
            Search
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

