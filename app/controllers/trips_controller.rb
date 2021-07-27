class TripsController < ApplicationController
    before_action :authorized, :current_user
    before_action :set_trip, only: [:show, :update, :destroy]
    before_action :trip_found?, only: [:show, :update, :destroy]

    def index
        
        trips = @user.trips
        render json: trips
    end

    def create
        
        trip = @user.trips.create(trip_params)
        if trip.valid?
            render json: trip, status: :created
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end
 
    def show
        render json: @trip           
    end

    def update
            @trip.update(trip_params)
            render json: @trip     
    end

    def destroy
            @trip.destroy
            head :no_content      
    end

    private 

    

    def set_trip
        @trip = @user.trips.find_by(id: params[:id])
    end

    def trip_found?
        render json: { error: "Not Found"}, status: :no_content unless @trip
    end

    def trip_params
        params.permit(:title, :content, :date)
    end

    def authorized
        return render json: {error: "unauthorized" }, status: :unauthorized unless session.include? :user_id
    end
end
