import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Bell, Gift, Clock, Users, Trophy, Upload, Wallet, X, CheckCircle, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import giftBox from '@/assets/gift-box.jpg';
import phonePrize from '@/assets/phone-prize.jpg';

const Dashboard = () => {
  const [selectedPrize, setSelectedPrize] = useState<any>(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [receipt, setReceipt] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const { toast } = useToast();

  const prizes = [
    {
      id: 1,
      title: "Mystery Gift Box",
      price: "$2",
      image: giftBox,
      participants: 1247,
      timeLeft: "2h 15m",
      description: "Surprise gift worth $10-50! Could be electronics, gift cards, or exclusive merchandise. Every box contains something special - perfect for trying your luck without breaking the bank.",
      features: ["Guaranteed value $10+", "Surprise element", "Fast shipping", "Perfect starter prize"],
      gradient: "from-primary to-primary-light"
    },
    {
      id: 2,
      title: "iPhone 15 Pro",
      price: "$5",
      image: phonePrize,
      participants: 3891,
      timeLeft: "5h 42m",
      description: "Brand new iPhone 15 Pro 256GB in your choice of color. Unlocked and ready to use with full manufacturer warranty. This is the latest model with all premium features.",
      features: ["256GB Storage", "All colors available", "Factory unlocked", "Full warranty"],
      gradient: "from-accent to-accent/80"
    }
  ];

  const handleParticipate = (prize: any) => {
    setSelectedPrize(prize);
  };

  const handleSubmitEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSelectedPrize(null);
      setWalletAddress('');
      setReceipt(null);
      toast({
        title: "Entry submitted!",
        description: `You're now entered in the ${selectedPrize.title} draw. Good luck!`,
      });
    }, 1500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReceipt(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-primary/10 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-primary p-2 rounded-xl">
                <Gift className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, John!</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Balance</div>
                <div className="text-xl font-bold text-primary">$45.20</div>
              </div>
              <Button variant="outline" size="sm">
                <Wallet className="w-4 h-4 mr-2" />
                Add Funds
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Notification Panel */}
        {showNotification && (
          <Card className="mb-8 winner-glow animate-bounce-in">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-success to-success/80 p-3 rounded-full">
                    <Trophy className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-success">Congratulations!</h3>
                    <p className="text-muted-foreground">
                      You won the <span className="font-medium text-foreground">Mystery Gift Box</span> draw from yesterday! 
                      Check your email for shipping details.
                    </p>
                    <div className="flex items-center space-x-4 mt-2">
                      <Badge className="bg-success/10 text-success">
                        Prize: $25 Amazon Gift Card
                      </Badge>
                      <Badge className="bg-primary/10 text-primary">
                        Delivered digitally
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNotification(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Entries</p>
                  <p className="text-2xl font-bold text-foreground">23</p>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Wins</p>
                  <p className="text-2xl font-bold text-success">3</p>
                </div>
                <div className="bg-success/10 p-3 rounded-full">
                  <Trophy className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Spent</p>
                  <p className="text-2xl font-bold text-foreground">$46</p>
                </div>
                <div className="bg-warning/10 p-3 rounded-full">
                  <Wallet className="h-6 w-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Win Rate</p>
                  <p className="text-2xl font-bold text-accent">13%</p>
                </div>
                <div className="bg-accent/10 p-3 rounded-full">
                  <Star className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Available Prizes */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Available Prizes</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {prizes.map((prize) => (
              <Card key={prize.id} className="lucky-card group overflow-hidden">
                <div className="relative h-64 mb-6">
                  <img 
                    src={prize.image} 
                    alt={prize.title}
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${prize.gradient} opacity-20 rounded-xl`}></div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-foreground">
                      <Clock className="w-3 h-3 mr-1" />
                      {prize.timeLeft}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">{prize.title}</CardTitle>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">{prize.price}</div>
                      <div className="text-sm text-muted-foreground">per entry</div>
                    </div>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    {prize.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    {prize.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Users className="w-4 h-4 mr-1" />
                      {prize.participants.toLocaleString()} entries
                    </div>
                    <div className="text-primary font-medium">
                      Odds: 1 in {prize.participants}
                    </div>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full btn-primary text-lg"
                        onClick={() => handleParticipate(prize)}
                      >
                        Participate Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle className="flex items-center space-x-2">
                          <Gift className="h-5 w-5 text-primary" />
                          <span>Enter Draw</span>
                        </DialogTitle>
                        <DialogDescription>
                          Complete your entry for {selectedPrize?.title}
                        </DialogDescription>
                      </DialogHeader>

                      <form onSubmit={handleSubmitEntry} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="wallet">Wallet Address</Label>
                          <Input
                            id="wallet"
                            placeholder="Enter your wallet address"
                            value={walletAddress}
                            onChange={(e) => setWalletAddress(e.target.value)}
                            required
                          />
                          <p className="text-xs text-muted-foreground">
                            We'll use this for payment verification
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="receipt">Payment Receipt</Label>
                          <div className="border-2 border-dashed border-primary/20 rounded-lg p-4 text-center">
                            <input
                              type="file"
                              id="receipt"
                              accept="image/*,.pdf"
                              onChange={handleFileUpload}
                              className="hidden"
                            />
                            <Label htmlFor="receipt" className="cursor-pointer">
                              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                              <p className="text-sm text-muted-foreground">
                                {receipt ? receipt.name : 'Click to upload receipt'}
                              </p>
                            </Label>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Upload proof of payment ({selectedPrize?.price})
                          </p>
                        </div>

                        <div className="bg-muted/50 rounded-lg p-4">
                          <h4 className="font-semibold text-foreground mb-2">Entry Summary</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>Prize:</span>
                              <span className="font-medium">{selectedPrize?.title}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Entry Cost:</span>
                              <span className="font-medium">{selectedPrize?.price}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Current Entries:</span>
                              <span className="font-medium">{selectedPrize?.participants}</span>
                            </div>
                          </div>
                        </div>

                        <Button 
                          type="submit" 
                          className="w-full btn-primary"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Submitting..." : "Submit Entry"}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;