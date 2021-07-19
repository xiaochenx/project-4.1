class TripsController < ApplicationController
    before_action :authorized

    def index
        user = User.find_by(id: session[:user_id])
        trips = user.trips
        render json: trips
    end

    def create
        user = User.find_by(id: session[:user_id])
        trip = user.trips.create(trip_params)
        if trip.valid?
            render json: trip, status: :created
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end
 
    def show
        user = User.find_by(id: session[:user_id])
        trip = user.trips.find_by(id: params[:id])
        if trip
            render json: trip
        else
            render json: { error: "Not Authorized"}, status: :unauthorized
        end
    end

    def update
        user = User.find_by(id: session[:user_id])
        trip = user.trips.find_by(id: params[:id])
        if trip
            trip.update(trip_params)
            render json: trip  
        else
            render json: { error: "Not Authorized"}, status: :unauthorized
        end
    end

    def destroy
        user = User.find_by(id: session[:user_id])
        trip = user.trips.find_by(id: params[:id])
        if trip
            trip.destroy
            head :no_content   
        else
            render json: { error: "Not Authorized"}, status: :unauthorized
        end
    end

    private 

    def trip_params
        params.permit(:title, :content, :date)
    end

    def authorized
        return render json: {error: "unauthorized" }, status: :unauthorized unless session.include? :user_id
    end
end
