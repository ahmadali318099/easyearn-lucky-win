"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useUser } from "@/contexts/UserContext"
import { Users, Copy, CheckCircle, Share2, DollarSign, UserPlus, Gift, TrendingUp } from "lucide-react"

export function ReferPage() {
  const { user } = useUser()
  const [copied, setCopied] = useState(false)

  const referralLink = `https://taskearn.com/signup?ref=${user?.referralCode}`
  const referralBonus = 5.0
  const secondTierBonus = 1.0

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Join TaskEarn and Start Earning!",
        text: "I'm earning money completing simple tasks on TaskEarn. Join me and get a $5 bonus!",
        url: referralLink,
      })
    } else {
      handleCopyLink()
    }
  }

  const referralStats = [
    {
      title: "Total Referrals",
      value: user?.referralCount || 0,
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Referral Earnings",
      value: `$${((user?.referralCount || 0) * referralBonus).toFixed(2)}`,
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "This Month",
      value: "2",
      icon: TrendingUp,
      color: "text-purple-600",
    },
    {
      title: "Pending Bonuses",
      value: "$10.00",
      icon: Gift,
      color: "text-orange-600",
    },
  ]

  const recentReferrals = [
    {
      email: "john.doe@email.com",
      date: "2024-01-15",
      status: "Active",
      earned: "$5.00",
    },
    {
      email: "jane.smith@email.com",
      date: "2024-01-12",
      status: "Active",
      earned: "$5.00",
    },
    {
      email: "mike.wilson@email.com",
      date: "2024-01-10",
      status: "Pending",
      earned: "$0.00",
    },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Refer Friends</h1>
        <p className="text-gray-600 mt-2">Earn ${referralBonus} for each friend you refer</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {referralStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Referral Link */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Share2 className="h-5 w-5 mr-2" />
              Your Referral Link
            </CardTitle>
            <CardDescription>Share this link with friends to earn ${referralBonus} per referral</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Referral Code</label>
              <div className="flex items-center space-x-2">
                <Input value={user?.referralCode || ""} readOnly className="font-mono text-lg font-bold text-center" />
                <Button variant="outline" size="sm" onClick={handleCopyLink} className="flex-shrink-0 bg-transparent">
                  {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Full Referral Link</label>
              <div className="flex items-center space-x-2">
                <Input value={referralLink} readOnly className="font-mono text-sm" />
                <Button variant="outline" size="sm" onClick={handleCopyLink} className="flex-shrink-0 bg-transparent">
                  {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              {copied && <p className="text-sm text-green-600">Link copied to clipboard!</p>}
            </div>

            <div className="flex space-x-3">
              <Button onClick={handleShare} className="flex-1">
                <Share2 className="h-4 w-4 mr-2" />
                Share Link
              </Button>
              <Button variant="outline" onClick={handleCopyLink} className="flex-1 bg-transparent">
                <Copy className="h-4 w-4 mr-2" />
                Copy Link
              </Button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">How it works:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Share your referral link with friends</li>
                <li>• They sign up and make a $10 deposit</li>
                <li>• You earn ${referralBonus} bonus instantly</li>
                <li>• Earn ${secondTierBonus} from their referrals too!</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Referral Program Details */}
        <Card>
          <CardHeader>
            <CardTitle>Referral Program Benefits</CardTitle>
            <CardDescription>Maximize your earnings through referrals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <DollarSign className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">Direct Referral Bonus</h4>
                  <p className="text-sm text-gray-600">
                    Earn ${referralBonus} for each friend who signs up and deposits $10
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">Second-Tier Earnings</h4>
                  <p className="text-sm text-gray-600">Earn ${secondTierBonus} from people your referrals bring in</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Gift className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium">Monthly Bonuses</h4>
                  <p className="text-sm text-gray-600">Top referrers get additional monthly rewards</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-medium">Lifetime Earnings</h4>
                  <p className="text-sm text-gray-600">Continue earning as your network grows</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-medium text-purple-900 mb-2">Referral Leaderboard</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-purple-800">Your Rank:</span>
                  <Badge variant="outline">#47</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-purple-800">This Month:</span>
                  <span className="text-sm font-medium text-purple-900">2 referrals</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Referrals */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <UserPlus className="h-5 w-5 mr-2" />
            Recent Referrals
          </CardTitle>
          <CardDescription>Track your referral activity and earnings</CardDescription>
        </CardHeader>
        <CardContent>
          {recentReferrals.length > 0 ? (
            <div className="space-y-4">
              {recentReferrals.map((referral, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{referral.email}</p>
                      <p className="text-sm text-gray-600">Joined on {referral.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge
                      variant={referral.status === "Active" ? "default" : "secondary"}
                      className={referral.status === "Active" ? "bg-green-100 text-green-800" : ""}
                    >
                      {referral.status}
                    </Badge>
                    <div className="text-right">
                      <p className="font-medium text-green-600">{referral.earned}</p>
                      <p className="text-xs text-gray-500">Earned</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No referrals yet. Start sharing your link to earn bonuses!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
