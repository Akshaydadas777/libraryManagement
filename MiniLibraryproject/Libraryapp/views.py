from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Admin, Book
from .Serializers import AdminSerializer, BookSerializer


# Create your views here.

@api_view(['POST'])
def admin_signup(request):
    serializer = AdminSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def admin_login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    user = Admin.objects.filter(email=email).first()
    if user and user.check_password(password):
        return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
    return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET', 'POST'])
def book_list(request):
    if request.method == 'GET': 
        books = Book.objects.all()
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':  
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def book_detail(request,pk):
    try:
        book = Book.objects.get(pk=pk)
    except Book.DoesNotExist:
        return Response({'error': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET': 
        serializer = BookSerializer(book)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = BookSerializer(book, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE': 
        book.delete()
        return Response({'message': 'Book deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
