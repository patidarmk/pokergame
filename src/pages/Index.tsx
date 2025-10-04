import { MadeWithApplaa } from "@/components/made-with-applaa";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "@tanstack/react-router";
import { Sparkles, Users, Trophy, Clock } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Users className="w-6 h-6 text-blue-500" />,
      title: "Multiplayer",
      description: "Play with up to 4 players at the virtual table"
    },
    {
      icon: <Trophy className="w-6 h-6 text-yellow-500" />,
      title: "Realistic Gameplay",
      description: "Authentic Texas Hold'em rules and betting rounds"
    },
    {
      icon: <Clock className="w-6 h-6 text-green-500" />,
      title: "Quick Games",
      description: "Fast-paced action with intuitive controls"
    },
    {
      icon: <Sparkles className="w-6 h-6 text-purple-500" />,
      title: "Beautiful UI",
      description: "Stunning poker table with smooth animations"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
              <Trophy className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Texas Hold'em Poker
          </h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Experience the thrill of poker with our beautifully designed game. 
            Play against AI opponents in this authentic Texas Hold'em experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-green-100 text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Game Preview */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-2xl text-center">Game Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-green-600 rounded-lg p-8 text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Trophy className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-2">Premium Poker Experience</h3>
                <p className="text-green-100">
                  Stunning visuals, smooth gameplay, and authentic poker action
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Button
            onClick={() => navigate({ to: "/poker" })}
            size="lg"
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold px-8 py-6 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <Trophy className="w-6 h-6 mr-2" />
            Play Poker Now
          </Button>
          <p className="text-green-200 mt-4 text-sm">
            No download required - play instantly in your browser
          </p>
        </div>
      </div>
      <MadeWithApplaa />
    </div>
  );
};

export default Index;