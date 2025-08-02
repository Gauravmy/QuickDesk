import { useState, useEffect } from 'react'
import api from '../lib/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Users,
  Tag,
  Plus,
  Edit,
  Trash2,
  Settings,
  Loader2,
  UserPlus,
  FolderPlus
} from 'lucide-react'
import { toast } from 'sonner'

export default function AdminPanel() {
  const [users, setUsers] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [userDialogOpen, setUserDialogOpen] = useState(false)
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [editingCategory, setEditingCategory] = useState(null)
  const [userForm, setUserForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user'
  })
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: '',
    color: '#007bff'
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [usersResponse, categoriesResponse] = await Promise.all([
        api.getUsers(),
        api.getCategories()
      ])
      setUsers(usersResponse.users || [])
      setCategories(categoriesResponse.categories || [])
    } catch (error) {
      console.error('Failed to fetch admin data:', error)
      toast.error('Failed to load admin data')
    } finally {
      setLoading(false)
    }
  }

  // User Management
  const handleUserSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingUser) {
        const updateData = { ...userForm }
        if (!updateData.password) delete updateData.password
        await api.updateUser(editingUser.id, updateData)
        toast.success('User updated successfully!')
      } else {
        await api.createUser(userForm)
        toast.success('User created successfully!')
      }
      setUserDialogOpen(false)
      resetUserForm()
      fetchData()
    } catch (error) {
      console.error('Failed to save user:', error)
      toast.error(error.message || 'Failed to save user')
    }
  }

  const handleDeleteUser = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) return
    
    try {
      await api.deleteUser(userId)
      toast.success('User deleted successfully!')
      fetchData()
    } catch (error) {
      console.error('Failed to delete user:', error)
      toast.error(error.message || 'Failed to delete user')
    }
  }

  const openUserDialog = (user = null) => {
    if (user) {
      setEditingUser(user)
      setUserForm({
        username: user.username,
        email: user.email,
        password: '',
        role: user.role
      })
    } else {
      resetUserForm()
    }
    setUserDialogOpen(true)
  }

  const resetUserForm = () => {
    setEditingUser(null)
    setUserForm({
      username: '',
      email: '',
      password: '',
      role: 'user'
    })
  }

  // Category Management
  const handleCategorySubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingCategory) {
        await api.updateCategory(editingCategory.id, categoryForm)
        toast.success('Category updated successfully!')
      } else {
        await api.createCategory(categoryForm)
        toast.success('Category created successfully!')
      }
      setCategoryDialogOpen(false)
      resetCategoryForm()
      fetchData()
    } catch (error) {
      console.error('Failed to save category:', error)
      toast.error(error.message || 'Failed to save category')
    }
  }

  const handleDeleteCategory = async (categoryId) => {
    if (!confirm('Are you sure you want to delete this category?')) return
    
    try {
      await api.deleteCategory(categoryId)
      toast.success('Category deleted successfully!')
      fetchData()
    } catch (error) {
      console.error('Failed to delete category:', error)
      toast.error(error.message || 'Failed to delete category')
    }
  }

  const openCategoryDialog = (category = null) => {
    if (category) {
      setEditingCategory(category)
      setCategoryForm({
        name: category.name,
        description: category.description || '',
        color: category.color
      })
    } else {
      resetCategoryForm()
    }
    setCategoryDialogOpen(true)
  }

  const resetCategoryForm = () => {
    setEditingCategory(null)
    setCategoryForm({
      name: '',
      description: '',
      color: '#007bff'
    })
  }

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'agent': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Settings className="h-8 w-8" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Panel</h1>
          <p className="text-muted-foreground">
            Manage users, categories, and system settings
          </p>
        </div>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <Tag className="h-4 w-4" />
            Categories
          </TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>
                    Manage user accounts and permissions
                  </CardDescription>
                </div>
                <Dialog open={userDialogOpen} onOpenChange={setUserDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => openUserDialog()}>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add User
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {editingUser ? 'Edit User' : 'Create New User'}
                      </DialogTitle>
                      <DialogDescription>
                        {editingUser 
                          ? 'Update user information and permissions'
                          : 'Add a new user to the system'
                        }
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleUserSubmit}>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="username">Username</Label>
                          <Input
                            id="username"
                            value={userForm.username}
                            onChange={(e) => setUserForm(prev => ({ ...prev, username: e.target.value }))}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={userForm.email}
                            onChange={(e) => setUserForm(prev => ({ ...prev, email: e.target.value }))}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">
                            Password {editingUser && '(leave blank to keep current)'}
                          </Label>
                          <Input
                            id="password"
                            type="password"
                            value={userForm.password}
                            onChange={(e) => setUserForm(prev => ({ ...prev, password: e.target.value }))}
                            required={!editingUser}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role">Role</Label>
                          <Select
                            value={userForm.role}
                            onValueChange={(value) => setUserForm(prev => ({ ...prev, role: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="user">User</SelectItem>
                              <SelectItem value="agent">Agent</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter className="mt-6">
                        <Button type="button" variant="outline" onClick={() => setUserDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit">
                          {editingUser ? 'Update' : 'Create'} User
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Username</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge className={getRoleBadgeColor(user.role)}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.is_active ? 'default' : 'secondary'}>
                          {user.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(user.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openUserDialog(user)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Category Management</CardTitle>
                  <CardDescription>
                    Manage ticket categories and their properties
                  </CardDescription>
                </div>
                <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => openCategoryDialog()}>
                      <FolderPlus className="mr-2 h-4 w-4" />
                      Add Category
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {editingCategory ? 'Edit Category' : 'Create New Category'}
                      </DialogTitle>
                      <DialogDescription>
                        {editingCategory 
                          ? 'Update category information'
                          : 'Add a new ticket category'
                        }
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCategorySubmit}>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="categoryName">Name</Label>
                          <Input
                            id="categoryName"
                            value={categoryForm.name}
                            onChange={(e) => setCategoryForm(prev => ({ ...prev, name: e.target.value }))}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="categoryDescription">Description</Label>
                          <Textarea
                            id="categoryDescription"
                            value={categoryForm.description}
                            onChange={(e) => setCategoryForm(prev => ({ ...prev, description: e.target.value }))}
                            rows={3}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="categoryColor">Color</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="categoryColor"
                              type="color"
                              value={categoryForm.color}
                              onChange={(e) => setCategoryForm(prev => ({ ...prev, color: e.target.value }))}
                              className="w-16 h-10"
                            />
                            <Input
                              value={categoryForm.color}
                              onChange={(e) => setCategoryForm(prev => ({ ...prev, color: e.target.value }))}
                              placeholder="#007bff"
                            />
                          </div>
                        </div>
                      </div>
                      <DialogFooter className="mt-6">
                        <Button type="button" variant="outline" onClick={() => setCategoryDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit">
                          {editingCategory ? 'Update' : 'Create'} Category
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Color</TableHead>
                    <TableHead>Tickets</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell>{category.description}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: category.color }}
                          />
                          <span className="text-sm text-muted-foreground">
                            {category.color}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{category.ticket_count || 0}</TableCell>
                      <TableCell>
                        <Badge variant={category.is_active ? 'default' : 'secondary'}>
                          {category.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openCategoryDialog(category)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteCategory(category.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

